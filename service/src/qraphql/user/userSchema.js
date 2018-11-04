import userTypes from './userTypes';
import userResolvers from './userResolvers';
import { log } from '../../middlewares/loggingMiddleware';

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
