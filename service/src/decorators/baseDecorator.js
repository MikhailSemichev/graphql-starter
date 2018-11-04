module.exports = ({ onStart, onSuccess, onError }) =>
    function baseDecorator(target, name, descriptor) {
        // put on method
        if (name) {
            const className = target.constructor.name;
            descriptor.value = wrappedMethod(
                className,
                descriptor.value,
                onStart,
                onSuccess,
                onError
            );
            return;
        }

        // put on class
        const className = target.name;
        Object.getOwnPropertyNames(target.prototype)
            .forEach(methodName => {
                // not private method and not constructor
                if (!methodName.startsWith('_') && methodName !== 'constructor') {
                    target.prototype[methodName] = wrappedMethod(
                        className,
                        target.prototype[methodName],
                        onStart,
                        onSuccess,
                        onError
                    );
                }
            });
    };

function wrappedMethod(className, method,
    onStart, onSuccess, onError) {
    const methodName = method.name;
    const methodInfo = `${className}.${methodName}`;

    // eslint-disable-next-line
    return function (...args) {
        const callContext = {};

        onStart({
            callContext,
            methodInfo,
            args,
        });

        try {
            const result = method.apply(this, args);

            // if Promise
            if (result && typeof result.then === 'function') {
                result.then(() => {
                    onSuccess({
                        callContext,
                        methodInfo,
                        args,
                        result,
                    });
                }, error => {
                    onError({
                        callContext,
                        methodInfo,
                        args,
                        error,
                    });
                });
            } else {
                onSuccess({
                    callContext,
                    methodInfo,
                    args,
                    result,
                });
            }

            return result;
        } catch (error) {
            onError({
                callContext,
                methodInfo,
                args,
                error,
            });
            throw error;
        }
    };
}
