const Product = require('../../models/Product');
const Wishlist = require("../../models/Wishlist");

const product_resolvers = {
    Query: {
        async getProducts(_, args) {
            try {
                const products = await Product.find({ wishlist: args.wishlist_id })
                return products
            } catch (error) {
                console.log('error fetching products')

            }
        }
    },
    
    Mutation: {
        async createProduct(_, args) {
            console.log(args)
            try {
              console.log('create product', args.productId);
              let product = await Product.findOne({ productId: args.productId });
            
              if (!product) {
                product = await Product.create(args);
              }
      
              const updatedWishlist = await Wishlist.findByIdAndUpdate(
                args.wishlistId,
                { $addToSet: { products: product._id } },
                { new: true }
              );
            
              return product;
            } catch (error) {
              console.log('Error creating product:', error);
              throw error;
            }
          }
        }
      };


module.exports = product_resolvers;