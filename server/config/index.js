const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        PORT: process.env.PORT || 3000,
        DB_CONNECTION: 'mongodb://localhost/pc-world',
        COOKIE_NAME: 'X-Authorization',
        SECRET: 'very strong secret',
        SALT_ROUNDS: 10,
        CLOUDINARY: {
            cloud_name: 'dex8g0z5j',
            api_key: '191732242924565',
            api_secret: '-BPQCKi5uOoiiZ-1Ii1dv_dock4'
        }
    },
    production: {}
};

module.exports = config[env];