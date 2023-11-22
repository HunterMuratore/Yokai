const { Schema, model } = require('mongoose');

const wishListSchema = new Schema({
    name: String,
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Wishlist = model('Wishlist', wishListSchema);

module.exports = Wishlist;