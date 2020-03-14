const mongoose = require("mongoose");
const MONGODB_CONFIG = require('./db.config');

const connectMongoDB = () => {
    const MONGO_ENDPOINT = 'mongodb://' + MONGODB_CONFIG['USERNAME'] + ':' + MONGODB_CONFIG['PASS'] + '@' + MONGODB_CONFIG['URL'] + ":" + MONGODB_CONFIG['PORT'] + "/" + MONGODB_CONFIG['NAME'];
    const connect = mongoose.connect(MONGO_ENDPOINT, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    connect.then((db) => {
        console.log('Connected to DB : [ ' + MONGO_ENDPOINT + ' ]');
    }, (err) => {
        console.error(err);
        process.exit();
    });
}

module.exports = connectMongoDB;