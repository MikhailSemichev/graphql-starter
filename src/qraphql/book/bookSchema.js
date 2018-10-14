const booksResolvers = require('./bookResolvers');
const authorResolvers = require('../author/authorResolvers');
const bookTypes = require('./bookTypes');

const { auth, ROLE } = require('../../middlewares/authMiddleware');
const { log } = require('../../middlewares/loggingMiddleware');

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
        getBooks: log()(auth([ROLE.CLIENT, ROLE.ADMIN])(booksResolvers.getBooks)),
        getBook: log()(auth([ROLE.CLIENT, ROLE.ADMIN])(booksResolvers.getBook)),
    },
    Mutation: {
        saveBook: log()(auth([ROLE.ADMIN])(booksResolvers.saveBook)),
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
