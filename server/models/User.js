const { Schema, model } = require('mongoose');
const { hash, compare } = require('bcrypt');

const Wishlist = require('./Wishlist');
const Product = require('./Product');

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        validate: {
            validator(val) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(val)
            },
            message() {
                return 'You must use a valid email address'
            }
        }
    },
    username: {
        type: String,
        unique: true,
        minLength: [2, 'Username must be at least 2 characters long'],
        maxLength: [10, 'Username must under 10 characters long']
    },
    password: {
        type: String,
        unique: true,
        minLength: [6, 'Password must be at least 6 characters long']
    },
    profilePicture: {
        type: String,
    },
    wishlists: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Wishlist'
        }
    ]
}, {
    timestamps: true,
    methods: {
        async validatePass(formPassword) {
            const is_valid = await compare(formPassword, this.password);

            return is_valid;
        }
    },
    toJSON: {
        transform(_, user) {
            delete user._v;
            delete user.password;
            return user;
        }
    }
});

userSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.password = await hash(this.password, 10);
    }

    next();
});

const User = model('User', userSchema);

module.exports = User;
