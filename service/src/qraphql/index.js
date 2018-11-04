import merge from 'lodash.merge';

import helloSchema from './hello/helloSchema';
import authorSchema from './author/authorSchema';
import bookSchema from './book/bookSchema';
import userSchema from './user/userSchema';

module.exports = {
    typeDefs:
        helloSchema.typeDefs +
        authorSchema.typeDefs +
        bookSchema.typeDefs +
        userSchema.typeDefs,
    resolvers: merge(
        helloSchema.resolvers,
        authorSchema.resolvers,
        bookSchema.resolvers,
        userSchema.resolvers
    ),
};
