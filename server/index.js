// server/index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const emailRoutes = require('./Routers/emailRoutes');

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_DATABASE:", process.env.DB_DATABASE);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_PORT:", process.env.DB_PORT);


const app = express();
const port = process.env.PORT || 5003;

app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', emailRoutes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });