const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const { COOKIE_NAME, SALT_ROUNDS } = require('../config');
const { isAuth } = require('../middlewares/guards');
const { createToken } = require('../utils/jwt');
const User = require('../models/User');
const Order = require('../models/Order');
const isLogged = require('../middlewares/isLogged');
const checkUser = require('../middlewares/checkUser');
const notebookService = require('../services/notebookService');
const { createOrder, getOrdersByUserId } = require('../services/orderService');

const services = {
    'notebooks': notebookService
}

const router = Router();

router.post('/login',
    body('email')
        .trim()
        .isEmail().withMessage('Invalid email!'),
    body('password')
        .trim()
        .isLength({ min: 5 }).withMessage('Password must be at least 5 characters long!')
        .isAlphanumeric().withMessage('Password must consist only english letters and digits!'),
    async (req, res) => {
        const { email, password } = req.body;

        try {
            const errors = validationResult(req).array().map(x => x.msg);

            if (errors.length > 0) {
                throw new Error(errors.join('\n'));
            }

            const user = await User.findOne({ email }).populate('defaultAddress');
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                throw new Error('Invalid email or password!');
            }

            const payload = removePass(user);

            const token = createToken({ id: user._id });
            res.cookie(COOKIE_NAME, token, { httpOnly: true });
            res.status(200).send(payload);
        } catch (error) {
            console.log(error.message);
            res.status(400).send({ message: error.message });
        }
    });

router.post('/register',
    body('email')
        .trim()
        .isEmail().withMessage('Invalid email!'),
    body('password')
        .trim()
        .isLength({ min: 5 }).withMessage('Password must be at least 5 characters long!')
        .isAlphanumeric().withMessage('Password must consist only english letters and digits!'),
    async (req, res) => {
        const { email, password } = req.body;
        try {
            const errors = validationResult(req).array().map(x => x.msg);

            if (errors.length > 0) {
                throw new Error(errors.join('\n'));
            }

            let user = await User.findOne({ email });

            if (user) {
                throw new Error('Account already exists');
            }

            const hashedPass = await bcrypt.hash(password, SALT_ROUNDS);

            user = new User({ email, password: hashedPass, isAdmin: false });
            await user.save();

            const payload = removePass(user);

            const token = createToken({ id: user._id });
            res.cookie(COOKIE_NAME, token, { httpOnly: true });
            res.status(200).send(payload);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    });

router.post('/orders', checkUser(), async (req, res) => {
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
        const createOrder = async () => {
            await asyncForEach(req.body.products, async (x) => {
                const currentProduct = await services[x.type].getById(x._id);
                mapped.push({
                    product: currentProduct._id,
                    onModel: x.type.substring(0, 1).toUpperCase() + x.type.substring(1, x.type.length - 1),
                    purchaseQuantity: x.quantity,
                    purchasePrice: currentProduct.currentPrice
                });
                console.log(mapped);
                totalCost += currentProduct.currentPrice;
                totalCost >= 100 ? deliveryPrice = 0 : deliveryPrice = 10;
            });
            orderData.products = mapped;
            orderData.deliveryPrice = deliveryPrice;
            const order = new Order(orderData);
            await order.save();
            res.status(201).send(order);
        }

        createOrder();
    } catch (error) {
        res.status(400).send({ message: error.message });
    }

});

router.get('/logout', isAuth(), (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.status(204).send({ message: 'Logged out' })
});

router.get('/verify', isLogged(), async (req, res) => {
    const user = await User.findById(req.decoded.id);
    const payload = removePass(user);
    res.status(200).send(payload);
});

router.put('/', isLogged(), async (req, res) => {
    const user = await User.findById(req.decoded.id);
    Object.assign(user, req.body);
    await user.save();
    const payload = removePass(user);
    res.status(200).send(payload);
});

router.get('/:userId/orders', isLogged(), async (req, res) => {
    try {
        const orders = await getOrdersByUserId(req.params.userId);
        res.status(200).send(orders);
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message });
    }
});

function removePass(user) {
    const payload = {
        email: user.email,
        _id: user._id,
        isAdmin: user.isAdmin,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        city: user.city,
        location: user.location
    }
    return payload;
}

module.exports = router;