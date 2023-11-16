const { Schema, model } = require('mongoose');

const wishListSchema = new Schema({
    name: String,
    produc: [
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

const WishList = model('WishList', wishListSchema);

module.exports = WishList;