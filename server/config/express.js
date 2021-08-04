const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const config = require('./index');
const path = require('path');

const routes = require('./routes');

module.exports = (app) => {

    app.use(express.static(path.join(__dirname, '..', 'public', 'dist')));
    app.use(cors(config.CORS));
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(express.json());

    app.use('/api', routes);
};
