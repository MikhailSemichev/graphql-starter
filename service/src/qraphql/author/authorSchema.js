import authorTypes from './authorTypes';
import authorResolvers from './authorResolvers';
import booksResolvers from '../book/bookResolvers';

const typeDefs = `
    extend type Query {
        getAuthor(id: String!): Author
        getAuthors(nameFilter: String): [Author]
    }

    extend type Mutation {
        saveAuthor(author: AuthorInput): Author
        deleteAuthor(id: String!): String
    }

    ${authorTypes}
`;

const resolvers = {
    Query: {
        getAuthor: authorResolvers.getAuthor,
        getAuthors: authorResolvers.getAuthors,
    },
    Mutation: {
        saveAuthor: authorResolvers.saveAuthor,
        deleteAuthor: authorResolvers.deleteAuthor,
    },
    Author: {
        books: (author, args, context) =>
            booksResolvers.getBooks(author, { filter: { authorId: author._id } }, context),
    },
};

export default {
    typeDefs,
    resolvers,
};
