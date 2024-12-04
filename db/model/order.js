const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Order = new Schema({
    productName: String,
    quantity : Number
});


module.exports = mongoose.model('Order', Order);