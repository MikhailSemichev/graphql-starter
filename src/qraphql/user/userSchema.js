const userTypes = require('./userTypes');
const userResolvers = require('./userResolvers');

const typeDefs = `
    extend type Mutation {
        login(login: String!, password: String!): LoginResult
    }

    ${userTypes}
`;

const resolvers = {
    Mutation: {
        login: userResolvers.login,
    },
};

module.exports = {
    typeDefs,
    resolvers,
};
