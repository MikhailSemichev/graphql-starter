import merge from 'lodash.merge';

import helloSchema from './hello/helloSchema';
import authorSchema from './author/authorSchema';
import bookSchema from './book/bookSchema';

export const typeDefs =
    helloSchema.typeDefs +
    authorSchema.typeDefs +
    bookSchema.typeDefs;

export const resolvers = merge(
    helloSchema.resolvers,
    authorSchema.resolvers,
    bookSchema.resolvers,
);
