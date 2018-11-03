const { BOOK_STATUS } = require('../../constants');
const { copyProps } = require('../../helpers/utils');
const { log } = require('../../decorators');

@log
class BookResolvers {
    getBook(_, args, context) {
        const { id } = args;
        return books.find(b => b._id === id);
    }

    getBooks(_, args, context) {
        const { filter = {} } = args;
        const { title, authorId } = filter;

        let result = books;

        if (title) {
            result = result.filter(b => b.title.includes(title));
        }

        if (authorId) {
            result = result.filter(b => b.authorId === authorId);
        }

        return result;
    }

    saveBook(_, args, context) {
        const { book } = args;

        if (!book._id) {
            book._id = `${Date.now()}`;
            books.push(book);
        } else {
            const bookToUpdate = books.find(b => b._id === book._id);
            copyProps(book, bookToUpdate);
        }

        return book;
    }
}

var books = [
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
        status: BOOK_STATUS.active,
    },
    {
        _id: '3',
        title: 'Book 3',
        year: 2018,
        authorId: '2',
        status: BOOK_STATUS.draft,
    },
];

module.exports = new BookResolvers();
