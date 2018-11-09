import logger from '../helpers/logger';
import baseDecorator from './baseDecorator';

/*
class Example {
    @log
    sum(a, b) {
        return a + b;
    }
}
const ex = new Example();
ex.sum(1, 2);


function log(target, name, descriptor) {
    const original = descriptor.value;
    descriptor.value = function wrap(...args) {
        console.log(`Arguments for ${name}: ${args}`);
        try {
            const result = original.apply(this, args);
            console.log(`Result from ${name}: ${result}`);
            return result;
        } catch (e) {
            console.log(`Error from ${name}: ${e}`);
            throw e;
        }
    };
}*/

export default (errorOnly) => baseDecorator({
    onStart({ callContext, methodInfo }) {
        if (!errorOnly) {
            logger.log(`${methodInfo}...`);
            callContext.start = Date.now();
        }
    },

    onSuccess({ callContext, methodInfo }) {
        if (!errorOnly) {
            logger.log(`${methodInfo} : perf=${Date.now() - callContext.start}ms`);
        }
    },

    onError({ methodInfo, args, error }) {
        logger.logError(`${methodInfo} (${JSON.stringify(args.slice(0, 2))})`, error);
    },
});

