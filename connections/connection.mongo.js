const mongoose = require('mongoose');
const { host, port, username, password, database } = require('../config').mongoDb;

module.exports = () => {
    let options = {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        poolSize: 10,
        keepAlive: 1,
        connectTimeoutMS: 30000,
        useUnifiedTopology: true
    };

    const db = mongoose.connection;
    db.on('connected', () => {
        console.log('Connected to mongodb');
    });
    db.on('error', (err) => {
        console.log('Error connecting to mongodb ', err);
    });

    db.on('disconnect', () => {
        console.log('Disconnected from mongodb');
    });
    const mongoDbUri = `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=admin`;
    mongoose.connect(mongoDbUri, options);
}