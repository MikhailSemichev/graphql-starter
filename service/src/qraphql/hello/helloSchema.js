let counter = 0;

const typeDefs = `
    type Query {
        hello: String
        long(delay: Int): Int
    }

    type Mutation {
        increment(val: Int): Int
    }
`;

const resolvers = {
    Query: {
        hello: () => 'Hello World',
        long: (_, args, context) => {
            const { delay } = args;
            const value = delay || Math.round(Math.random() * 10000);
            return new Promise(r => setTimeout(r, value, value));
        },
    },
    Mutation: {
        increment: (_, { val }, context) => {
            counter += val;
            return counter;
        },
    },
};

export default {
    typeDefs,
    resolvers,
};
