const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        PORT: process.env.PORT || 3000,
        DB_CONNECTION: 'mongodb://localhost/pc-world',
        COOKIE_NAME: 'X-Authorization',
        SECRET: 'very strong secret',
        SALT_ROUNDS: 10
    },
    production: {}
};

module.exports = config[env];