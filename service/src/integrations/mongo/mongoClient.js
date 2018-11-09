import mongoose from 'mongoose';
import { log } from '../../decorators';
import { MONGO_URL, MONGO_TIMEOUT } from '../../constants';
export { default as Mongo } from './mongoSchema';

@log(true)
class MongoClient {
    init() {
        mongoose.Promise = global.Promise;
        // Mongoose's built in promise library is deprecated, replace it with ES2015 Promise
        mongoose.connect(MONGO_URL, {
            socketTimeoutMS: MONGO_TIMEOUT,
            connectTimeoutMS: MONGO_TIMEOUT,
            keepAlive: true, // contains type discrepancy in the docs (boolean vs number)?
            reconnectTries: 30,
            poolSize: 10,
            useNewUrlParser: true,
        });
        mongoose.connection
            .once('open', () => console.log('Connected to MongoDB instance.'))
            .on('error', error => console.log('Error connecting to MongoDB:', error));
    }

    findOne(MongoObject, condition, select) {
        return MongoObject.findOne(condition, select);
    }

    findMany(MongoObject, condition, options = {}) {
        console.log(condition);
        const { select, skip = 0, limit, sort } = options;

        return MongoObject
            .find(condition)
            .select(select)
            .skip(skip)
            .limit(limit)
            .sort(sort);
    }

    async upsert(MongoObject, item, returnUpdated) {
        const _id = item._id || mongoose.Types.ObjectId().toString();

        await MongoObject.updateOne({ _id }, item, {
            upsert: true,
        });

        if (returnUpdated) {
            return this.findOne(MongoObject, { _id });
        }

        return item;
    }

    remove(MongoObject, condition) {
        return MongoObject.remove(condition);
    }
}

const client = new MongoClient();
client.init();

export default client;
