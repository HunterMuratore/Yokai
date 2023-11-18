const Product = require('../../models/Product');

const product_resolvers = {
    Query: {
        
    },
    
    Mutation: {
        async createProduct(_, args) {
            const product = await Product.findOne({productId});

            if (!product) {
                const newProduct = await Product.create(args);

                return newProduct;
            }

            return product;
        }
    }
}


module.exports = product_resolvers;