module.exports = `
    type User {
        _id: String
        name: String
    }

    type LoginResult {
        token: String
        user: User
    }   
`;
