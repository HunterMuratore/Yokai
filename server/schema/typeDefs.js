const gql = String.raw;

const typeDefs = gql`
    scalar Upload

    type Wishlist {
        _id: ID
        name: String
        products: [Product]
        user: [User]
    }

    type User {
        _id: ID
        email: String
        username: String
        profilePicture: String
        createdAt: String
        updatedAt: String
        wishlists: [Wishlist]
    }

    type Product {
        productId: String
        name: String
        image: String
        price: Int
    }

    type Query {
        authenticate: User
        getWishlists: [Wishlist]
        getAllWishlists: [Wishlist]
        getProducts: [Product]
        getAllUsersWishlists: [User]
        getUserById(userId: ID!): User
    }

    type Mutation {
        register(email: String!, username: String!, password: String!): User
        login(identifier: String!, password: String!): User
        logout: String
        uploadProfilePicture(id: ID!, profilePicture: Upload!): User
        createWishlist(name: String!): Wishlist
        updateWishlist(id: ID!, name: String!): Wishlist
        deleteWishlist(id: ID!): Wishlist
        createProduct(name: String!, productId: Int!, wishlistId: ID!, image: String!, price: Int!): Product
    }
`
module.exports = typeDefs;