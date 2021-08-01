const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const { COOKIE_NAME, SALT_ROUNDS } = require('../config');
const { isAuth } = require('../middlewares/guards');
const { createToken } = require('../utils/jwt');
const isLogged = require('../middlewares/isLogged');
const notebookService = require('../services/notebookService');
const { getWarrantiesByUserIdAndPage, getAllWarrantiesByUserId } = require('../services/orderService');
const { createUser, getUserById, getUserByEmail } = require('../services/userService');


const router = Router();

router.post('/login',
    body('email')
        .trim()
        .isEmail().withMessage('Invalid email!'),
    body('password')
        .trim()
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long!'),
    async (req, res) => {
        const { email, password } = req.body;

        try {
            const errors = validationResult(req).array().map(x => x.msg);

            if (errors.length > 0) {
                throw new Error(errors.join('\n'));
            }

            const user = await getUserByEmail(email);
            if (!user) {
                throw new Error('Invalid email or password!');
            }
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                throw new Error('Invalid email or password!');
            }

            const payload = removePass(user);

            const token = createToken({ id: user._id });
            res.cookie(COOKIE_NAME, token, { httpOnly: true });
            res.status(200).send(payload);
        } catch (error) {
            console.log(error);

            res.status(400).send({ message: error.message });
        }
    });

router.post('/register',
    body('email')
        .trim()
        .isEmail().withMessage('Invalid email!'),
    body('password')
        .trim()
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long!'),
    async (req, res) => {
        const { email, password } = req.body;
        try {
            const errors = validationResult(req).array().map(x => x.msg);

            if (errors.length > 0) {
                throw new Error(errors.join('\n'));
            }

            let user = await getUserByEmail(email);

            if (user) {
                throw new Error('Account already exists');
            }

            const hashedPass = await bcrypt.hash(password, SALT_ROUNDS);

            user = await createUser({ email, password: hashedPass, isAdmin: false });

            const payload = removePass(user);

            const token = createToken({ id: user._id });
            res.cookie(COOKIE_NAME, token, { httpOnly: true });
            res.status(200).send(payload);
        } catch (error) {
            console.log(error);
            res.status(400).send({ message: error.message });
        }
    });

router.get('/logout', isLogged(), (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.status(204).send({ message: 'Logged out' })
});

router.get('/verify', isLogged(), async (req, res) => {
    const user = await getUserById(req.decoded.id);
    const payload = removePass(user);
    res.status(200).send(payload);
});

router.put('/', isLogged(), async (req, res) => {
    const user = await getUserById(req.decoded.id);
    Object.assign(user, req.body);
    await user.save();
    const payload = removePass(user);
    res.status(200).send(payload);
});

router.get('/warranties', isLogged(), async (req, res) => {
    try {
        const warranties = await getWarrantiesByUserIdAndPage(req.decoded.id, req.query.page - 1);
        const warrantiesCount = await getAllWarrantiesByUserId(req.decoded.id);
        res.status(200).send({ warranties, count: warrantiesCount.length });
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