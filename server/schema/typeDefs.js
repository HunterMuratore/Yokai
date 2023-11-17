const gql = String.raw;

const typeDefs = gql`
    type Wishlist {
        _id: ID
        name: String
    }

    type User {
        _id: ID
        email: String
        username: String
        createdAt: String
        updatedAt: String
        wishlists: [Wishlist]
    }

    type Query {
        authenticate: User
    }

    type Mutation {
        register(email: String!, username: String!, password: String!): User
        login(identifier: String!, password: String!): User
        logout: String
        createWishlist(name: String!): Wishlist
        updateWishlist(id: ID!, name: String!): Wishlist
        deleteWishlist(id: ID!): Wishlist
    }
`
module.exports = typeDefs;