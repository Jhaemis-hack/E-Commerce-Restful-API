const mongoose = require('mongoose');
const DB = async () => {
    try {
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect("mongodb://localhost:27017/Api_DB");
        console.log('Database connected: ' + conn.connection.host)
    } catch (error) {
        console.log(error);
    }
};

module.exports = DB;

