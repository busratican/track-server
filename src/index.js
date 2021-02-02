require('./models/User');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();
app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

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

//access app, require Authorization
app.get('/', requireAuth, (req,res) => {
    res.send(`Your email: ${req.user.email}`);
}); 

app.listen(3000, () => {
    console.log('Listening port 3000');
})