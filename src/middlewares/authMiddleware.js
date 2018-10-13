const { AuthenticationError } = require('apollo-server-express');
const { ROLE } = require('../enums');

// usage: auth([ROLE.ADMIN])((parent, args, context) => { ... })
// returns: (parent, args, context) => { ... }
module.exports.auth = (roles) => (resolverFn) => {
    return (parent, args, context) => {
        if (!context.user || !roles.includes(context.user.role)) {
            throw new AuthenticationError();
        }
        return resolverFn(parent, args, context);
    };
};

module.exports.ROLE = ROLE;
