const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const books = [
    {
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'J.K. Rowling',
    },
    {
        title: 'Jurassic Park',
        author: 'Michael Crichton',
    },
];

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
    hello: String
  }
`;

const resolvers = {
    Query: {
        books: () => books,
        hello: () => 'Hello world',
    },
};

const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.applyMiddleware({ app }); // app is from an existing express app

app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
