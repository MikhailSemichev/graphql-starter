const merge = require('lodash.merge');

const helloSchema = require('./hello/helloSchema');
const authorSchema = require('./author/authorSchema');
const bookSchema = require('./book/bookSchema');

module.exports = {
    typeDefs: helloSchema.typeDefs + authorSchema.typeDefs + bookSchema.typeDefs,
    resolvers: merge(helloSchema.resolvers, authorSchema.resolvers, bookSchema.resolvers),
};
