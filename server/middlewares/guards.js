// const playService = require('../services/playService');
const { getUserById } = require('../services/userService');

const isAuth = () => {
    return (req, res, next) => {
        if (req.user !== undefined) {
            next();
        } else {
            res.redirect('/auth/login');
        }
    };
};

const isGuest = () => {
    return (req, res, next) => {
        if (req.user == undefined) {
            next();
        } else {
            res.redirect('/');
        }
    };
};

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

const isCreator = () => async (req, res, next) => {
    // const play = await playService.getById(req.params.id);
    // const isCreator = req.user && play.creator == req.user._id;

    if (!isCreator) {
        res.redirect('/');
        return;
    } 
    next();
}


module.exports = {
    isAuth,
    isGuest,
    isAdmin
}