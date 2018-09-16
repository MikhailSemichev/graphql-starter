const merge = require('lodash.merge');

const helloSchema = require('./hello/helloSchema');
const authorSchema = require('./author/authorSchema');
const bookSchema = require('./book/bookSchema');
const userSchema = require('./user/userSchema');

module.exports = {
    typeDefs: helloSchema.typeDefs + authorSchema.typeDefs + bookSchema.typeDefs + userSchema.typeDefs,
    resolvers: merge(helloSchema.resolvers, authorSchema.resolvers, bookSchema.resolvers, userSchema.resolvers),
};
