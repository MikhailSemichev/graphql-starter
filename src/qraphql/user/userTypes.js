module.exports = `
    type User {
        _id: String
        name: String
        role: String
    }

    type LoginResult {
        token: String
        user: User
    }   
`;
