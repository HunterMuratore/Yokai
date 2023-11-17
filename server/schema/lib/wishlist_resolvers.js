const Wishlist = require('../../models/Wishlist');

const wishlist_resolvers = {
    Query: {
        
    },

    Mutation: {
        async createWishlist(_, args) {
            const wishlist = await Wishlist.create(args);

            return wishlist;
        },

        async updateWishlist(_, { id, ...args }) {
            const wishlist = await Wishlist.findByIdAndUpdate(id, args, { new: true });

            return wishlist;
        },

        async deleteWishlist(_, { id }) {
            const wishlist = await Wishlist.findByIdAndDelete(id);

            return wishlist;
        }
    }
}


module.exports = wishlist_resolvers;