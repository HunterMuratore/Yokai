const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    productId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: String,
    price: Number
});

const Product = model('Product', productSchema);

module.exports = Product;