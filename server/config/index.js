const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        PORT: process.env.PORT || 3000,
        DB_CONNECTION: process.env.DB_CONNECTION_PC_WORLD, // enter your local MongoDB string here
        COOKIE_NAME: 'X-Authorization',
        SECRET: 'very strong secret',
        SALT_ROUNDS: 10,
        CLOUDINARY: {
            cloud_name: process.env.CLOUDINARY_NAME, // enter your cloud name from cloudinary account
            api_key: process.env.CLOUDINARY_KEY, // enter your cloud key from cloudinary account
            api_secret: process.env.CLOUDINARY_SECRET // enter your cloud secret from cloudinary account
        },
        CORS: {
            origin: ['http://localhost:4200'],
            credentials: true
        }
    },
    production: {
        PORT: process.env.PORT || 80,
        DB_CONNECTION: process.env.DB_CONNECTION,
        COOKIE_NAME: 'X-Authorization',
        SECRET: 'very strong secret',
        SALT_ROUNDS: 10,
        CLOUDINARY: {
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET
        },
        CORS: {
            origin: ["https://pc-world-angular.herokuapp.com/"],
            credentials: true
        }
    }
};

module.exports = config[env];