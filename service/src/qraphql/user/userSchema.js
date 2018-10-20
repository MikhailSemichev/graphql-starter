const userTypes = require('./userTypes');
const userResolvers = require('./userResolvers');
const { log } = require('../../middlewares/loggingMiddleware');

const typeDefs = `
    extend type Mutation {
        login(login: String!, password: String!): LoginResult
    }

    ${userTypes}
`;

const resolvers = {
    Mutation: {
        login: log()(userResolvers.login),
    },
};

module.exports = {
    typeDefs,
    resolvers,
};
