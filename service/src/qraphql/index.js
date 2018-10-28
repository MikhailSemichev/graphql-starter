const merge = require('lodash.merge');

const helloSchema = require('./hello/helloSchema');
const authorSchema = require('./author/authorSchema');
const bookSchema = require('./book/bookSchema');
const userSchema = require('./user/userSchema');

module.exports = {
    typeDefs:
        helloSchema.typeDefs +
        authorSchema.typeDefs +
        bookSchema.typeDefs +
        userSchema.typeDefs,
    resolvers: merge(
        helloSchema.resolvers,
        authorSchema.resolvers,
        bookSchema.resolvers,
        userSchema.resolvers
    ),
};

debugger;
setTimeout(function() {
    try {
        const p1 = new Person();
        p1.sayHi('Ivan');
    } catch (err) {
       const ar = err;
       const errr = ar;
    }
}, 200);

//@log
class Person {
    @log
    sayHi(name) {
        return `Hello ${name}`;
    }
}

function log(target, name, descriptor) {
    const originalFunction = descriptor.value;

    // eslint-disable-next-line
    descriptor.value = function (...args) {
        console.log('logger: ', ...args);
        return originalFunction.apply(this, args);
    };
}
