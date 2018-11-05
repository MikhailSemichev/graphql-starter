import { AuthenticationError } from 'apollo-server-express';

import baseDecorator from './baseDecorator';
import { AUTH_MODE } from '../constants';
import { ROLE } from '../enums';

const auth = (roles) => baseDecorator({
    onStart({ callContext, methodInfo, args }) {
        const context = args[2]; // (parent, args, context)

        if (AUTH_MODE && (!context.user || !roles.includes(context.user.role))) {
            throw new AuthenticationError();
        }
    },

    onSuccess({ callContext, methodInfo }) {
        //
    },

    onError({ methodInfo, args, error }) {
        //
    },
});

export default {
    client: auth([ROLE.CLIENT, ROLE.ADMIN]),
    admin: auth([ROLE.ADMIN]),
};
