const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const routes = require('./routes');

module.exports = (app) => {

    app.use(cors({
        origin: 'http://localhost:4200',
        credentials: true
    }));
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(express.static('./static'));
    app.use(express.json())

    app.use('/api', routes);
};