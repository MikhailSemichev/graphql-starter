import userTypes from './userTypes';
import userResolvers from './userResolvers';

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

export default {
    typeDefs,
    resolvers,
};
