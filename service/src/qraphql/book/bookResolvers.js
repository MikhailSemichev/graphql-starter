import { BOOK_STATUS } from '../../enums';
import { log, critical } from '../../decorators';

import mongoClient, { Mongo } from '../../integrations/mongo/mongoClient';
import redisClient from '../../integrations/redisClient';
import stripeClient from '../../integrations/stripeClient';

@log
class BookResolvers {
    async getBook(_, args, context) {
        const { id } = args;
        const book = await mongoClient.findOne(Mongo.Book, { _id: id });
        return book;
    }

    async getBooks(_, args, context) {
        const { filter = {} } = args;
        const { title, authorId } = filter;

        const condition = {};

        if (title) {
            condition.title = { $regex: `.*${title}.*`, $options: 'si' };
        }

        if (authorId) {
            condition.authorId = authorId;
        }

        const books = await mongoClient.findMany(Mongo.Book, condition);

        return books;
    }

    async saveBook(_, args, context) {
        const { book } = args;

        const updatedBook = await mongoClient.upsert(Mongo.Book, book, true);

        return updatedBook;
    }

    async getTop10Books(_, args, context) {
        let result = await redisClient.get('top_10_books1');
        if (!result) {
            // super long calculation of top 10
            await new Promise(res => setTimeout(res, 3000));
            const top10 = mongoClient.findMany(Mongo.Book, {}, { limit: 2 }); // books.slice(0, 2);

            // cache results
            redisClient.set('top_10_books1', top10);
            result = top10;
        }

        return result;
    }

    @critical
    async buyBook(_, args, context) {
        const { bookId, stripeToken } = args;
        const recipt = await stripeClient.payStripe(stripeToken, `Buy book ${bookId}`);

        // Store recipt to db

        return recipt;
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

export default new BookResolvers();
