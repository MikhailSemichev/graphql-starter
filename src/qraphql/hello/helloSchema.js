const typeDefs = `
    extend type Query {
        hello: String
    }
`;

const resolvers = {
    Query: {
        hello: () => 'Hello World',
    },
};

module.exports = {
    typeDefs,
    resolvers,
};
