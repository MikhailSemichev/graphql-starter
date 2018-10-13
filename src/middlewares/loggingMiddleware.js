// usage: log()((parent, args, context) => { ... })
// returns: (parent, args, context) => { ... }
module.exports.log = (settings) => (resolverFn) => {
    return async (parent, args, context) => {
        const resolverName = resolverFn.name; // getBooks
        const argsJson = JSON.stringify(args); // filter {title, authorId}
        const userId = context.user && context.user._id; // 123

        let datetime = new Date().toISOString();
        const time = Date.now();
        const userTransaction = `userId ${userId} : tr ${time}`;
        console.log(`${datetime} CALL resolver ${resolverName} : args ${argsJson} : ${userTransaction}`);

        try {
            const result = await resolverFn(parent, args, context);

            datetime = new Date().toISOString();
            console.log(`${datetime} SUCCESS resolver ${resolverName} : perf=${Date.now() - time}ms : ${userTransaction}`);

            return result;
        } catch (error) {
            datetime = new Date().toISOString();
            console.log(`${datetime} ERROR resolver ${resolverName} : ${error.toString()} : perf=${Date.now() - time}ms : ${userTransaction}`);

            throw error;
        }
    };
};
