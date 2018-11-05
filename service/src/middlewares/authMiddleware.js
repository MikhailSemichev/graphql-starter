import { AuthenticationError } from 'apollo-server-express';
import { AUTH_MODE } from '../constants';

export { ROLE } from '../enums';

// usage: auth([ROLE.ADMIN])((parent, args, context) => { ... })
// returns: (parent, args, context) => { ... }
export const auth = (roles) => (resolverFn) => {
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
