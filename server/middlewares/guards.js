const { getUserById } = require('../services/userService');

const isAdmin = () => {
    return async (req, res, next) => {
        const user = await getUserById(req.decoded.id);
        if (user.isAdmin) {
            next();
        } else {
            res.status(401).send({ message: 'User is not admin' });
        }
    };
};

module.exports = {
    isAdmin
}