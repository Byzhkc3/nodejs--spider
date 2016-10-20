var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/documents';

exports.save = function (document) {
    MongoClient.connect(url, function (err, db) {
        assert.equal(err, null);
        var collection = db.collection('documents');
        collection.insertOne(document, function (err, result) {
            assert.equal(err, null);
            assert.equal(1, result.insertedCount);
            db.close();
        });
    });
}
