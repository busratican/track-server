const express = require('express');
const mongoose = require('mongoose');
const app = express();

const mongoUri = 'mongodb+srv://busragul:3ZBLZ4.samsun@tackappcluster.r7y8p.mongodb.net/<dbname>?retryWrites=true&w=majority'

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true
});

mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance.');
});

mongoose.connection.on('error', () => {
    console.log('Error connecting to mongo', err);
});

app.get('/', (req,res) => {
    res.send('Hi there!');
}); 

app.listen(3000, () => {
    console.log('Listening port 3000');
})