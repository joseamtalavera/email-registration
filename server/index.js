// server/index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const emailRoutes = require('./Routers/emailRoutes');
const path = require('path');

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_DATABASE:", process.env.DB_DATABASE);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_PORT:", process.env.DB_PORT);


const app = express();

app.use(express.static(path.join(__dirname, '../client/build')));

const port = process.env.PORT || 5003;

const allowedOrigins = ['http://localhost:3001', 'https://emailcall.onrender.com'];

app.use(cors({
        origin: function(origin, callback){
            if(!origin) return callback(null, true);
            if(allowedOrigins.indexOf(origin) === -1){
                var msg = 'The CORS policy for this site does not ' +
                                    'allow access from the specified Origin.';
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        credentials: true,
}));

/* app.use(cors({
    origin: 'https://emailcall.onrender.com',
    credentials: true,
})); */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', emailRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });