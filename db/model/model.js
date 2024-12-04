const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const product = new Schema({
    name : {
        type: String,
        required: true,
        unique: true
    },
    price : {
        type: Number,
        required:true
    },
    details : {
        type: String,
        required: true
    },
    productImage : {
        type : Object
    }
});




module.exports = mongoose.model('Product', product);