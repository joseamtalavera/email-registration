
/* const pool = new Pool({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
}); */

const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
    host: isProduction ? process.env.RENDER_DB_HOST : process.env.DB_HOST,
    port: isProduction ? process.env.RENDER_DB_PORT : process.env.DB_PORT,
    database: isProduction ? process.env.RENDER_DB_NAME : process.env.DB_DATABASE,
    user: isProduction ? process.env.RENDER_DB_USER : process.env.DB_USER,
    password: isProduction ? process.env.RENDER_DB_PASSWORD : process.env.DB_PASSWORD,
    ssl: isProduction,
});

module.exports = pool;