const User = require('../../models/User');

const { createToken } = require('../../auth');

const user_resolvers = {
    Query: {
        authenticate(_, __, context) {
            return context.user;
        }
    },

    Mutation: {
        async register(_, args, context) {
            try {
                const user = await User.create(args);

                const token = await createToken(user._id);

                context.res.cookie('token', token, {
                    maxAge: 120 * 60 * 1000,
                    httpOnly: true
                });

                return user;
            } catch (err) {
                let message;

                if (err.code === 11000) {
                    message = 'That email address is already in use'
                } else {
                    message = err.message
                }

                throw new Error(message);
            }
        },

        async login(_, args, context) {
            const { identifier, password } = args;

            try {
                const user = await User.findOne({
                    $or: [{ email: identifier }, { username: identifier }],
                }).populate({
                    path: 'wishlists',
                    populate: {
                        path: 'products',
                        model: 'Product',
                    },
                });

                if (!user) throw new Error('User not found');

                const pass_is_valid = await user.validatePass(password);

                if (!pass_is_valid) throw new Error('Password invalid');

                const token = await createToken(user._id);

                context.res.cookie('token', token, {
                    maxAge: 120 * 60 * 1000,
                    httpOnly: true,
                    secure: process.env.PORT ? true : false
                });

                return user;

            } catch (err) {
                throw new Error(err)
            }
        },     
        
        logout(_, __, context) {
            context.res.clearCookie('token')

            return 'User logged out successfully'
        }
    }
}

module.exports = user_resolvers;
