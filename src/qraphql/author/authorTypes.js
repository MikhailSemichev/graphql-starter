module.exports = `
    type Author {
        _id: String
        name: String
        books: [Book]
    }

    input AuthorInput {
        _id: String
        name: String!
    }
`;
