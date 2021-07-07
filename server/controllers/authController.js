const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { COOKIE_NAME, SECRET, SALT_ROUNDS } = require('../config');
const { isAuth } = require('../middlewares/guards');
const User = require('../models/User');

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

            const { password, ...payload } = user;

            const token = jwt.sign({ id: user._id }, SECRET);
            res.cookie(COOKIE_NAME, token, { httpOnly: true });
            res.status(200).send(payload);
        } catch (error) {
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
    body('password')
        .trim()
        .custom((value, { req }) => {
            if (value && value !== req.body.repeatPassword) {
                throw new Error('Passwords don`t match!');
            }
            return true;
        }),
    async (req, res) => {
        const { email, password } = req.body;

        try {
            const errors = validationResult(req).array().map(x => x.msg);

            if (errors.length > 0) {
                throw new Error(errors.join('\n'));
            }

            const hashedPass = await bcrypt.hash(password, SALT_ROUNDS);

            const user = new User({ email, password: hashedPass });

            const { password, ...payload } = user;

            const token = jwt.sign({ id: user._id }, SECRET);
            res.cookie(COOKIE_NAME, token, { httpOnly: true });
            res.status(200).send(payload);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    });

router.get('/logout', isAuth(), (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.status(204).send({ message: 'Logged out'})
});

module.exports = router;