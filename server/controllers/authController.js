const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { COOKIE_NAME, SECRET, SALT_ROUNDS } = require('../config');
const { isAuth } = require('../middlewares/guards');
const { createToken } = require('../utils/jwt');
const User = require('../models/User');
const isLogged = require('../middlewares/isLogged');

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
})

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