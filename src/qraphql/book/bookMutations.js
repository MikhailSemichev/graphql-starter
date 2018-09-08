const { BOOK_STATUS } = require('../../helpers/constants');

class BookMutations {
    createBook(_, args, context) {
        return {
            _id: '3333333',
            title: 'Book 1',
            year: 2017,
            authorId: '1',
            status: BOOK_STATUS.draft,
        };
    }
}

module.exports = new BookMutations();
