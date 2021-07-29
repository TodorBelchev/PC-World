const { Router } = require('express');

const isLogged = require('../middlewares/isLogged');
const checkUser = require('../middlewares/checkUser');
const notebookService = require('../services/notebookService');
const partsService = require('../services/partService');
const monitorService = require('../services/monitorService');
const { createOrder, getOrdersByUserId, getOrdersByPage, editOrder, deleteOrder, generateWarranty, getCurrentSales, getAllOrders, getOrder } = require('../services/orderService');
const { isAdmin } = require('../middlewares/guards');
const getProductsCountFromOrders = require('../utils/getProductsCountFromOrders');

const services = {
    'notebooks': notebookService,
    'processors': partsService,
    'vgas': partsService,
    'ssds': partsService,
    'motherboards': partsService,
    'psus': partsService,
    'hdds': partsService,
    'memories': partsService,
    'cases': partsService,
    'psus': partsService,
    'coolers': partsService,
    'monitors': monitorService
}

const router = Router();



router.post('/', checkUser(), async (req, res) => {
    try {

        const mapped = [];
        const orderData = req.body;
        let currentUser;
        let deliveryPrice = 0;
        let totalCost = 0;
        if (!req.decoded) {
            currentUser = {
                firstName: orderData.firstName,
                lastName: orderData.lastName,
                phoneNumber: orderData.phoneNumber,
                city: orderData.city,
                location: orderData.location,
            }
            orderData.guest = currentUser;
        } else {
            currentUser = req.decoded.id;
            orderData.user = currentUser;
        }

        async function asyncForEach(array, callback) {
            for (let index = 0; index < array.length; index++) {
                await callback(array[index], index, array);
            }
        }

        const createOrderWrapper = async () => {
            await asyncForEach(req.body.products, async (x) => {
                let partName = x.type.substring(0, x.type.length - 1);
                if (partName === 'memorie') {
                    partName = 'memory';
                }
                const currentProduct = await services[x.type].getById(x._id, partName);
                if (currentProduct.quantity < x.quantity) {
                    throw new Error('Not enough quantity!');
                }
                console.log(currentProduct.currentPrice);
                mapped.push({
                    product: currentProduct._id,
                    onModel: partName.substring(0, 1).toUpperCase() + partName.substring(1, partName.length),
                    purchaseQuantity: x.quantity,
                    purchasePrice: currentProduct.currentPrice
                });
                totalCost += currentProduct.currentPrice;
                totalCost >= 100 ? deliveryPrice = 0 : deliveryPrice = 10;
            });
            orderData.products = mapped;
            orderData.deliveryPrice = deliveryPrice;
            orderData.totalPrice = totalCost + deliveryPrice;
            const date = new Date().setHours(3, 1, 1, 1);
            orderData.createdAt = date;
            const order = await createOrder(orderData);
            res.status(201).send(order);
        }

        await createOrderWrapper();
    } catch (error) {
        console.log(error.message);
        console.log(error);
        res.status(400).send({ message: error.message });
    }

});


router.get('/customer/:userId', isLogged(), async (req, res) => {
    try {
        const orders = await getOrdersByUserId(req.params.userId);
        res.status(200).send(orders);
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message });
    }
});

router.get('/sales/current', isLogged(), isAdmin(), async (req, res) => {
    try {
        const period = req.query.period;
        const sales = await getCurrentSales(period);
        res.status(200).send(sales);
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message });
    }
});

router.get('/sales/share', isLogged(), isAdmin(), async (req, res) => {
    try {
        const orders = await getAllOrders();
        const count = getProductsCountFromOrders(orders)
        res.status(200).send(count);
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message });
    }
});

router.get('/admin/:page', isLogged(), isAdmin(), async (req, res) => {
    try {
        const orders = await getOrdersByPage(req.params.page - 1);
        res.status(200).send(orders);
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message });
    }
});

router.put('/admin', isLogged(), isAdmin(), async (req, res) => {
    try {
        const order = await getOrder(req.body._id);
        let completed = false;
        if (order.status == 'completed') {
            throw new Error('This orders is completed!')
        }
        if (req.body.status == 'completed') {
            order.products.forEach(x => {
                generateWarranty({
                    user: order.user || order.guest,
                    product: x.product._id,
                    onModel: x.onModel,
                    purchaseQuantity: x.purchaseQuantity,
                    purchasePrice: x.purchasePrice,
                    warranty: x.product.warranty,
                    order: order._id
                });
                x.product.quantity -= x.purchaseQuantity;
                x.product.save();
            });
            completed = true;
        }
        Object.assign(order, req.body, { completed });
        await order.save();
        res.status(200).send(order);
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message });
    }
});

router.delete('/admin/:id/delete', isLogged(), isAdmin(), async (req, res) => {
    try {
        const result = await deleteOrder(req.params.id);
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message });
    }
});


module.exports = router;