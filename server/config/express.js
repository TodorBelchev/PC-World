const express = require('express');
const cookieParser = require('cookie-parser');

const routes = require('./routes');
const isLogged = require('../middlewares/isLogged');

module.exports = (app) => {

    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(express.static('./static'));
    app.use(isLogged());

    app.use('/api', routes);
};