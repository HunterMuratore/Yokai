const mongoose = require('mongoose');

const is_prod = prcoess.env.PORT;

mongoose.connect(is_prod ? process.env.DB_URL : 'mongodb://127.0.0.1:27017/wishlist_db');


module.exports = mongoose.connection;