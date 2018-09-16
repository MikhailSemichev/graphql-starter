const booksResolvers = require('./bookResolvers');
const authorResolvers = require('../author/authorResolvers');
const bookTypes = require('./bookTypes');

const typeDefs = `
    extend type Query {
        getBooks(filter: BooksFilterInput): [Book]
        getBook(id: String!): Book
    }

    extend type Mutation {
        saveBook(book: BookInput): Book
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
        // history: (parent, args, context) => getEstimationHistory(context, { estimationId: parent._id })
        author: (book, args, context) =>
            authorResolvers.getAuthor(book, { id: book.authorId }, context),
    },
};

module.exports = {
    typeDefs,
    resolvers,
};
