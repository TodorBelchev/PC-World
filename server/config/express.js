const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const config = require('./index');

const routes = require('./routes');

module.exports = (app) => {

    if (config.PROD) {
        app.use(express.static(path.join(__dirname, "client/dist/PC-World")));
        app.get("*", (req, res) => {
            res.sendFile(path.join(__dirname, "client/PC-World/dist/PC-World", 'index.html'));
        });
    }
    app.use(cors(config.CORS));
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(express.static('./static'));
    app.use(express.json());

    app.use('/api', routes);
};
