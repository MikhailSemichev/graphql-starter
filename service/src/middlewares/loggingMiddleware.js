import logger from '../helpers/logger';
// usage: log()((parent, args, context) => { ... })
// returns: (parent, args, context) => { ... }
module.exports.log = (settings) => (resolverFn) => {
    async function wrappedResolver(parent, args, context) {
        const resolverName = wrappedResolver.displayName; // getBooks
        const argsJson = JSON.stringify(args); // filter {title, authorId}
        const userId = context.user && context.user._id; // 123
        const time = Date.now();
        const userTransaction = `userId ${userId} : tr ${time}`;

        logger.log(`${resolverName}... : args ${argsJson} : ${userTransaction}`);

        try {
            const result = await resolverFn(parent, args, context);

            logger.log(`${resolverName} : perf=${Date.now() - time}ms : ${userTransaction}`);

            return result;
        } catch (error) {
            logger.logError(`${resolverName} : ${userTransaction}`, error);

            throw error;
        }
    }

    wrappedResolver.displayName = resolverFn.displayName || resolverFn.name;

    return wrappedResolver;
};
