import booksResolvers from './bookResolvers';
import authorResolvers from '../author/authorResolvers';
import bookTypes from './bookTypes';

import { AuthenticationError } from 'apollo-server-express';
import { AUTH_MODE } from '../../constants';
import { ROLE } from '../../enums';

const typeDefs = `
    extend type Query {
        getBooks(filter: BooksFilterInput): [Book]
        getBook(id: String!): Book
        getTop10Books: [Book]
    }
    
    extend type Mutation {
        saveBook(book: BookInput!): Book
        buyBook(bookId: String!, stripeToken: String!): String
    }

    ${bookTypes}
`;

const resolvers = {
    Query: {
        getBooks: auth([ROLE.CLIENT, ROLE.ADMIN], booksResolvers.getBooks),
        getBook: booksResolvers.getBook,
        getTop10Books: booksResolvers.getTop10Books,
    },
    Mutation: {
        saveBook: auth([ROLE.ADMIN], booksResolvers.saveBook),
        buyBook: booksResolvers.buyBook,
    },
    Book: {
        author: (book, args, context) =>
            authorResolvers.getAuthor(book, { id: book.authorId }, context),
    },
};


// Auth
function auth(roles, resolver) {
    return (parent, args, context) => {
        if (AUTH_MODE && (!context.user || !roles.includes(context.user.role))) {
            throw new AuthenticationError();
        }
        return resolver(parent, args, context);
    };
}


export default {
    typeDefs,
    resolvers,
};
