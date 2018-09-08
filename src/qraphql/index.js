const merge = require('lodash.merge');

const bookSchema = require('./book/bookSchema');
const helloSchema = require('./hello/helloSchema');

const typeDefs = `
    type Query {
        dummy1: String
    }
    type Mutation {
        dummy2: String
    }
`;

module.exports = {
    typeDefs: typeDefs + bookSchema.typeDefs + helloSchema.typeDefs,
    resolvers: merge(bookSchema.resolvers, helloSchema.resolvers),
};
