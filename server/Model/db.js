
/* const pool = new Pool({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
}); */

/* const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
    host: isProduction ? process.env.RENDER_DB_HOST : process.env.DB_HOST,
    port: isProduction ? process.env.RENDER_DB_PORT : process.env.DB_PORT,
    database: isProduction ? process.env.RENDER_DB_NAME : process.env.DB_DATABASE,
    user: isProduction ? process.env.RENDER_DB_USER : process.env.DB_USER,
    password: isProduction ? process.env.RENDER_DB_PASSWORD : process.env.DB_PASSWORD,
    ssl: isProduction,
});

module.exports = pool; */

const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

let poolConfig;

if (isProduction) {
    // For production, use DATABASE_URL
    poolConfig = {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
    };
} else {
    // For local development, use individual environment variables
    poolConfig = {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        // Assume SSL is not needed for local development, adjust as necessary
    };
}

const pool = new Pool(poolConfig);

module.exports = pool;