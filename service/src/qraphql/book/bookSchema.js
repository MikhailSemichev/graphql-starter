import booksResolvers from './bookResolvers';
import authorResolvers from '../author/authorResolvers';
import bookTypes from './bookTypes';

const typeDefs = `
    extend type Query {
        getBooks(filter: BooksFilterInput): [Book]
        getBook(id: String!): Book
    }

    extend type Mutation {
        saveBook(book: BookInput!): Book
    }

    ${bookTypes}
`;

const resolvers = {
    Query: {
        getBooks: booksResolvers.getBooks,
        getBook: booksResolvers.getBook,
    },
    Mutation: {
        saveBook: booksResolvers.saveBook,
    },
    Book: {
        author: (book, args, context) =>
            authorResolvers.getAuthor(book, { id: book.authorId }, context),
    },
};

export default {
    typeDefs,
    resolvers,
};
