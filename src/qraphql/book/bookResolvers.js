const { BOOK_STATUS } = require('../../helpers/constants');

class BookResolvers {
    getBooks(_, args, context) {
        return [
            {
                _id: '1',
                title: 'Book 1',
                year: 2017,
                authorId: '1',
                status: BOOK_STATUS.active,
            },
            {
                _id: '2',
                title: 'Book 2',
                year: 2018,
                authorId: '1',
                status: BOOK_STATUS.draft,
            },
        ];
    }

    getBook(_, args, context) {
        return {
            _id: '1',
            title: 'String1',
            year: 2018,
            authorId: '1',
            status: BOOK_STATUS.active,
        };
    }

    getAuthor(book, args, context) {
        return {
            _id: book.authorId,
            name: `Author ${book.authorId}`,
        };
    }
}

module.exports = new BookResolvers();
