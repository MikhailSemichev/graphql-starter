/* ********** Configuration ********** */

// TO INPUT: SOURCE CONNECTION
const CONNECTION_STRING = 'mongodb://vote-app:vote-app-1@ds211088.mlab.com:11088/vote-app-dev';
const conn = new Mongo(CONNECTION_STRING);
// TO INPUT: SOURCE DB NAME ...
const db = conn.getDB('vote-app-dev');

const collectionName = 'books';

/* ********** /Configuration ********** */

/* ********** Backup ********** */
print('************* Backup');

const backupName = `${collectionName}_backup_${new Date()}`.replace(/[\s\:\+]/g, '_');
db.createCollection(backupName);
const backupCollection = db.getCollection(backupName);

const collection = db.getCollection(collectionName);

const backupItems = collection.find().toArray();
backupCollection.insertMany(backupItems);

/* ********** /Backup ********** */


print('************* Start ******************');


print('*** Add book price');
collection.find({}).forEach(book => {
    book.price = 0;
    collection.save(book);
});

print('************* Finish ******************');
