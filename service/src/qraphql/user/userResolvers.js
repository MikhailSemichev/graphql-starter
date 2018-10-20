const { UserInputError } = require('apollo-server-express');
const { generateToken } = require('../../helpers/tokenHelper');
const { ROLE } = require('../../enums');

class UserResolvers {
    login(_, args, context) {
        const { login, password } = args;

        if (!login || !password) {
            throw new UserInputError('Login or password are incorrect');
        }

        const user = {
            _id: '123456',
            name: 'Ivan Ivanov',
            role: ROLE.ADMIN,
        };

        const token = generateToken(user);

        return {
            user,
            token,
        };
    }
}

module.exports = new UserResolvers();
