import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './qraphql';

import './helpers/logger';

const app = express();

app.use(cors());

const server = new ApolloServer({
    typeDefs,
    resolvers,
    engine: {
        // https://engine.apollographql.com/service/MikhailSemichev-7695/explorer
        apiKey: 'service:MikhailSemichev-7695:JIEFvdrvmmn5ALyOz4WJYA',
    },
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

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
