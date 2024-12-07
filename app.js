require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const DB = require('./db/config/db');

DB();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/products', require('./api/routes/products'))
app.use('/orders', require('./api/routes/order'))
app.use('/products/uploads', express.static('uploads'))
app.use('/user/', require('./api/routes/User'))

 


app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        return res.status(200).json({});
    }
});


app.listen(PORT, (req, res, next) => {
    console.log(`Server is running on port ${PORT}`);
});