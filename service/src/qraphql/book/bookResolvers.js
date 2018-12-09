import { log, critical, auth } from '../../decorators';
import { Mongo } from '../../integrations/mongo/mongoClient';

// Here we can switch between real Mongo db client and Mock client with test data 
// import mongoClient from '../../integrations/mongo/mongoClient';
import mongoClient from '../../integrations/mongo/mongoClient.BooksMock';

import redisClient from '../../integrations/redis/redisClient';
import stripeClient from '../../integrations/stripe/stripeClient';

@log
class BookResolvers {
    @auth.client
    async getBook(_, args, context) {
        const { id } = args;
        const book = await mongoClient.findOne(Mongo.Book, { _id: id });
        return book;
    }

    @auth.client
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

    @auth.admin
    async saveBook(_, args, context) {
        const { book } = args;

        const updatedBook = await mongoClient.upsert(Mongo.Book, book, true);

        return updatedBook;
    }

    @auth.client
    async getTop10Books(_, args, context) {
        let result = await redisClient.get('top_10_books1');
        if (!result) {
            // super long calculation of top 10
            await new Promise(res => setTimeout(res, 3000));
            const top10 = await mongoClient.findMany(Mongo.Book, {}, { limit: 3 }); // books.slice(0, 2);

            // cache results
            redisClient.set('top_10_books1', top10);
            result = top10;
        }

        return result;
    }

    @critical
    @auth.client
    async buyBook(_, args, context) {
        const { bookId, stripeToken } = args;
        const recipt = await stripeClient.payStripe(stripeToken, `Buy book ${bookId}`);

        // Store recipt to db

        return recipt;
    }
}

export default new BookResolvers();
