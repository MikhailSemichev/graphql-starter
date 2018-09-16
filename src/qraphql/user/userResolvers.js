const { UserInputError } = require('apollo-server-express');

class UserResolvers {
    login(_, args, context) {
        const { login, password } = args;

        if (!login || !password) {
            throw new UserInputError('Login or password are incorrect');
        }

        return {
            user: {
                _id: '111',
                name: 'Mikhail Semichev',
            },
            token: 'token_token_token_123',
        };
    }
}

module.exports = new UserResolvers();
