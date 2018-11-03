const MONGO_TIMEOUT = 30000;

class MongoClient {
    find(MongoObject, args) {
        // wrap and execute native Mongo client method
        return new Promise((resolve, reject) => {
            const { find, select, skip, limit, sort } = args;
            setTimeout(() => handleMongoTimeout(reject, `Mongo timeout: ${JSON.stringify(args, null, 4)}`), MONGO_TIMEOUT);

            MongoObject
                .find(find)
                .collation({ locale: 'en_US', strength: 1 })
                .select(select)
                .skip(skip)
                .limit(limit)
                .sort(sort)  // example: { 'age' : -1, 'posts': 1 }
                .then(data => {
                    if (!withCount) {
                        resolve(data);
                    } else {
                        MongoObject.countDocuments(find).then(r => {
                            resolve([data, r]);
                        });
                    }
                })
                .catch(error => {
                    handleMongoError(error, reject, `could not find: ${JSON.stringify(args, null, 4)}`);
                });
        });
    }

    upsert(MongoObject, item) {
        // insert or update in mongo
    }
}

module.exports = new MongoClient();

