let counter = 0;

export const typeDefs = `
    type Query {
        hello: String
        long(delay: Int): String
    }

    type Mutation {
        increment(val: Int): Int
    }
`;

export const resolvers = {
    Query: {
        hello: () => {
            debugger;
            return 'Hello World';
        },
        long: (_, args, context) => {
            const { delay } = args;
            const timeMS = delay || Math.round(Math.random() * 10000);

            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(`Return after delay: ${timeMS}`);
                }, timeMS);
            });
        },
    },
    Mutation: {
        increment: (_, { val }, context) => {
            counter += val;
            return counter;
        },
    },
};
