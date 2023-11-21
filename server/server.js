const express = require('express');
const cookieParser = require('cookie-parser');

const { ApolloServer } = require('@apollo/server');
const { expressMiddleware, up } = require('@apollo/server/express4');

const app = express();

const PORT = process.env.PORT || 3333;
const is_prod = process.env.NODE_ENV === 'production';
const path = require('path');

require('dotenv').config();

const db = require('./config/connection');

const { authenticate } = require('./auth');
const { typeDefs, resolvers } = require('./schema');

const server = new ApolloServer({
    typeDefs,
    resolvers
});

async function startServer() {
    await server.start();

    app.use(express.json());

    if (is_prod) {
        app.use(express.static(path.join(__dirname, '../client/dist')))
    }

    app.use(cookieParser());

    app.use('/graphql', expressMiddleware(server, {
        context: authenticate
    }));

    app.get('/test', (req, res) => {
        res.send('something')
    })


    if (is_prod) {
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../client/dist/index.html'));
        });
    }

    db.once('open', () => {
        console.log('Database connected');

        app.listen(PORT, () => {
            console.log('Server started on port', PORT);
            console.log('GraphQL ready at /graphql');
        });
    });
}

startServer();
