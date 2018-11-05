export default `
    type Book {
        _id: String
        title: String
        year: Int
        authorId: String
        author: Author
        status: BookStatus
    }

    input BookInput {
        _id: String
        title: String!
        year: Int!
        authorId: String!
        status: BookStatus
    }

    input BooksFilterInput {
        title: String
        authorId: String
    }

    enum BookStatus {
        draft
        active
        deleted
    }
`;
