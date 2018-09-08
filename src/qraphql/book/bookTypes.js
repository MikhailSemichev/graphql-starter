module.exports = `
    type Book {
        _id: String
        title: String
        year: Int
        author: Author
        status: BookStatus
    }

    type Author {
        _id: String
        name: String
    }

    input CreateBookInput {
        title: String!
        year: Int!
        authorId: String!
        status: BookStatus
    }

    input BooksFilterInput {
        title: String
        year: String
    }

    enum BookStatus {
        draft
        active
        deleted
    }
`;
