const booksResolvers = require('./bookResolvers');
const booksMutations = require('./bookMutations');
const bookTypes = require('./bookTypes');

const typeDefs = `
    extend type Query {
        getBooks(filter: BooksFilterInput): [Book]
        getBook(id: String!): Book
    }

    extend type Mutation {
        createBook(book: CreateBookInput): Book
        deleteBook(id: String!): String
    }

    ${bookTypes}
`;

const resolvers = {
    Query: {
        getBooks: (...p) => booksResolvers.getBooks(...p),
        getBook: (...p) => booksResolvers.getBook(...p),
    },
    Mutation: {
        createBook: (...p) => booksMutations.createBook(...p),
    },
    Book: {
        // history: (parent, args, context) => getEstimationHistory(context, { estimationId: parent._id })
        author: (...p) => booksResolvers.getAuthor(...p),
    },
};

module.exports = {
    typeDefs,
    resolvers,
};
