const user_resolvers = require('./lib/user_resolvers');
const wishlist_resolvers = require('./lib/wishlist_resolvers');
const product_resolvers = require('./lib/product_resolvers');

const resolvers = {
    Query: {
        ...user_resolvers.Query,
        ...wishlist_resolvers.Query,
        ...product_resolvers.Query

    },

    Mutation: {
        ...user_resolvers.Mutation,
        ...wishlist_resolvers.Mutation,
        ...product_resolvers.Mutation
    }
}

module.exports = resolvers;
