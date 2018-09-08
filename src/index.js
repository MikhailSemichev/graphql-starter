const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const { typeDefs, resolvers } = require('./qraphql');

const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: {
        endpoint: '/graphql',
        settings: {
            'editor.theme': 'light',
            'editor.fontSize': 16,
            'editor.cursorShape': 'line',
        },
    },
});

server.applyMiddleware({ app }); // app is from an existing express app

app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
