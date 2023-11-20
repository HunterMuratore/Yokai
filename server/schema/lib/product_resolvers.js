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
                try {
        
                    const existingProduct = await Product.findOne({ productId: args.productId });
    
                    let product;
                    if (!existingProduct) {
                        product = await Product.create(args); 
                        product = existingProduct;
                    }
                    const updatedWishlist = await Wishlist.findByIdAndUpdate(
                        args.wishlist_id,
                        { $addToSet: { products: product.productId } },
                        { new: true }
                    );
    
                    return product;
                } catch (error) {
                    console.log('Error creating product:', error);
                    throw error;
                }
            }
        }
}


module.exports = product_resolvers;