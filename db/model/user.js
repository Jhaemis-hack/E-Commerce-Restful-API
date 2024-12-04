const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const User = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/                                                                                      
    },
    password : {
        type: String,
        required: true,
        minlength: 5,
    }
});


module.exports = mongoose.model('user', User);