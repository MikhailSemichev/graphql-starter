import gql from 'graphql-tag';

const queries = {};

queries.hello = gql`
    query Hello {
        hello
    }
`;

queries.getBook = gql`
    query getBook($id: String!) {
        getBook(id: $id) {
            _id,
            title
            year
            author {
                _id
                name
            }
        }
    }
`;

queries.getBooks = gql`
    query getBooks($filter: BooksFilterInput) {
        getBooks(filter: $filter) {
            _id,
            title
            year
        }
    }
`;

export default queries;
