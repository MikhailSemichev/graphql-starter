const logger = require('../helpers/logger');

module.exports = function log(target, name, descriptor) {
    // put on method
    if (name) {
        const className = target.constructor.name;
        descriptor.value = wrappedMethod(
            className,
            descriptor.value
        );
        return;
    }

    // put on class
    const className = target.name;
    for (const methodName of Object.keys(target.prototype)) {
        // not private method
        if (!methodName.startsWith('_')) {
            target.prototype[methodName] = wrappedMethod(
                className,
                target.prototype[methodName]
            );
        }
    }
};

function wrappedMethod(className, method) {
    const methodInfo = `${className}.${method.name}`;

    // eslint-disable-next-line
    return function (...args) {
        const time = Date.now();

        logger.log(`${methodInfo}...`);
        try {
            const result = method.apply(this, args);

            // if Promise
            if (result && typeof result.then === 'function') {
                result.then(() => {
                    logger.log(`${methodInfo} : perf=${Date.now() - time}ms`);
                }, error => {
                    logger.logError(`${methodInfo} (${JSON.stringify(args.slice(0, 2))})`, error);
                });
            } else {
                logger.log(`${methodInfo} : perf=${Date.now() - time}ms`);
            }

            return result;
        } catch (error) {
            logger.logError(`${methodInfo} (${JSON.stringify(args.slice(0, 2))})`, error);
            throw error;
        }
    };
}
