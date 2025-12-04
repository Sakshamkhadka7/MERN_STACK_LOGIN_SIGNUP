require('dotenv').config();          // Load env FIRST
require('./Models/db');              // Then connect DB

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const AuthRouter = require('./Routes/AuthRouter');
const productRouter = require('./Routes/ProductRouter');

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());

app.get('/ping', (req, res) => {
    res.send('Pong');
});

app.use('/auth', AuthRouter);
app.use('/product', productRouter);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
