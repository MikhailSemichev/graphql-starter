import booksResolvers from './bookResolvers';
import authorResolvers from '../author/authorResolvers';
import bookTypes from './bookTypes';

const typeDefs = `
    extend type Query {
        getBook(id: String!): Book
        getBooks(filter: BooksFilterInput): [Book]
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
        getBook: booksResolvers.getBook,
        getBooks: booksResolvers.getBooks,
        getTop10Books: booksResolvers.getTop10Books,
    },
    Mutation: {
        saveBook: booksResolvers.saveBook,
        buyBook: booksResolvers.buyBook,
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
