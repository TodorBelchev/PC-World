const { Router } = require('express');

const isLogged = require('../middlewares/isLogged');
const checkUser = require('../middlewares/checkUser');
const notebookService = require('../services/notebookService');
const partsService = require('../services/partService');
const { createOrder, getOrdersByUserId, getOrdersByPage, editOrder, deleteOrder, generateWarranty, getCurrentSales } = require('../services/orderService');
const { isAdmin } = require('../middlewares/guards');

const services = {
    'notebooks': notebookService,
    'processors': partsService,
    'vgas': partsService,
    'ssds': partsService
}

const router = Router();



router.post('/', checkUser(), async (req, res) => {
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

    try {
        const createOrderWrapper = async () => {
            await asyncForEach(req.body.products, async (x) => {
                const currentProduct = await services[x.type].getById(x._id, x.type.substring(0, x.type.length - 1));
                mapped.push({
                    product: currentProduct._id,
                    onModel: x.type.substring(0, 1).toUpperCase() + x.type.substring(1, x.type.length - 1),
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

        createOrderWrapper();
    } catch (error) {
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
        const order = await editOrder(req.body._id, req.body);
        if (order.status == 'completed') {
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
            });
        }
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