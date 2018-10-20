import gql from 'graphql-tag';

const mutations = {};

mutations.saveBook = gql`
    mutation saveBook($book: BookInput!) {
        saveBook(book: $book) {
            _id
            title
        }
    }
`;

export default mutations;
