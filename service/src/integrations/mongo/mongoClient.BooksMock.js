import { BOOK_STATUS } from '../../enums';

class MongoClient_BooksMock {
    books = [];
    init() {
        this.books = [
            { _id: '1', title: 'Mock Book 1', year: 2017, authorId: '1', status: BOOK_STATUS.active },
            { _id: '2', title: 'Mock Book 2', year: 2018, authorId: '1', status: BOOK_STATUS.active },
            { _id: '3', title: 'Mock Book 3', year: 2019, authorId: '1', status: BOOK_STATUS.active },
            { _id: '4', title: 'Mock Book 44', year: 2017, authorId: '2', status: BOOK_STATUS.active },
            { _id: '5', title: 'Mock Book 55', year: 2020, authorId: '2', status: BOOK_STATUS.draft },
        ];
    }

    findOne(MongoObject, { _id }, select) {
        return this.books.find(b => b._id === _id);
    }

    findMany(MongoObject, { title, authorId }, options = {}) {
        return this.books.filter(b =>
            (!authorId || b.authorId === authorId) &&
            (!title || new RegExp(title.$regex).test(b.title))
        );
    }

    async upsert(MongoObject, item, returnUpdated) {
        if (item._id) {
            this.books = this.books.map(b => b._id === item._id ? item : b);
        } else {
            item._id = Date.now().toString();
            this.books = [
                ...this.books,
                item,
            ];
        }
        return item;
    }

    remove(MongoObject, { _id }) {
        this.books = this.books.filter(b => b._id === _id);
    }
}

const client = new MongoClient_BooksMock();
client.init();

export default client;
