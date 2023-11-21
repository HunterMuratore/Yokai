const User = require("../../models/User");
const Wishlist = require("../../models/Wishlist");

const wishlist_resolvers = {
  Query: {
    async getWishlists(_, __, context) {
      if (!context || !context.user || !context.user._id) {
        throw new Error("User not logged in");
      }

      try {
        const wishlists = await Wishlist.find({ user: context.user._id }).populate('products');
        return wishlists;
      } catch (error) {
        console.error("Error fetching wishlists:", error);
      }
    },

    async getAllWishlists(_, __, context) {
      try {
        const wishlists = await Wishlist.find().populate('products');
        return wishlists;
      } catch (error) {
        console.error("Error fetching all wishlists:", error);
      }
    },

    async getAllUsersWishlists(_, __, context) {
      try {
        const userWishlists  = await User.find({}).populate('wishlists')
        return userWishlists
      } catch (err) {
        console.error('Could not fetch wishlists')
        throw new Error('oops, no wishlists')
      }
    }
  },


  Mutation: {
    async createWishlist(_, { name }, context) {
      if (!context || !context.user || !context.user._id)
        throw new Error("User is not authenticated");
      const wishlist = await Wishlist.create({
        name,
        user: context.user._id,
      });
      await User.findByIdAndUpdate(
        context.user._id,
        { $push: { wishlists: wishlist._id } },
        { new: true }
      );
      return wishlist;
    },

    async updateWishlist(_, { id, name }, context) {
      if (!context || !context.user || !context.user._id)
        throw new Error("User is not authenticated");
      const wishlist = await Wishlist.findByIdAndUpdate(
        id,
        { name },
        { new: true }
      );

      return wishlist;
    },

    async deleteWishlist(_, { id }, context) {
      if (!context || !context.user || !context.user._id)
        throw new Error("User is not authenticated");
      const wishlist = await Wishlist.findByIdAndDelete(id);
      if (!wishlist) throw new Error("no wishlist found");

      await User.findByIdAndUpdate(
        context.user._id,
        { $pull: { wishlists: id } },
        { new: true }
      );

      return wishlist;
    },
  },
};

module.exports = wishlist_resolvers;
