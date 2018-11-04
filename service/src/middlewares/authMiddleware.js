import { AuthenticationError } from 'apollo-server-express';
import { ROLE } from '../enums';
import { AUTH_MODE } from '../constants'

// usage: auth([ROLE.ADMIN])((parent, args, context) => { ... })
// returns: (parent, args, context) => { ... }
module.exports.auth = (roles) => (resolverFn) => {
    function wrappedResolver(parent, args, context) {
        if (AUTH_MODE) {
            if (!context.user || !roles.includes(context.user.role)) {
                throw new AuthenticationError();
            }
        }
        return resolverFn(parent, args, context);
    }

    wrappedResolver.displayName = resolverFn.displayName || resolverFn.name;

    return wrappedResolver;
};

module.exports.ROLE = ROLE;
