const { sign, verify } = require('jsonwebtoken');

const User = require('../models/User');

async function createToken(user_id) {
    try {
        const token = await sign({ user_id }, process.env.JWT_SECRET);

        return token;

    } catch (err) {
        console.log('jwt create error', err.message);
    }
}

// Send the user's cookie through for every request that they make
async function authenticate({ req, res }) {
    const token = req.cookies.token;

    if (!token) return { res };

    try {
        const data = await verify(token, process.env.JWT_SECRET, {
            maxAge: '2hr'
        });

        const user = await User.findById(data.user_id).populate('wishlists');

        return { user, res };

    } catch (err) {
        return { res };
    }
}

module.exports = { createToken, authenticate }