'use strict';

//Dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//setup express and middleware
const app = express();
app.use(cors());
app.use(express.json());

function testCommit (){
  console.log('foo');
}

//handler imports
const handleBookSearch = require('./routes/bookSearch');
const handleAddBook = require('./routes/bookAdd');
const handleMatchCharter = require('./routes/matchCharter');
const handleBookRemove = require('./routes/bookRemove');
const handleBookReview = require('./routes/bookReview');
const handleLibraryList = require('./routes/libraryListing');

const PORT = process.env.PORT || 3001

//Connect to DB and proof of connection
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
  console.log('Mongoose is connected!');
});

//Request Paths
app.get('/test', (req, res) => res.status(200).send('I AM ALIVE! Hello! :)'));
app.get('/books/search', handleBookSearch); //?title=
app.post('/books/add/:charter', handleAddBook); //data:{book} :charter#
app.get('/books/catalogue', handleMatchCharter); //?charter#
app.delete('/books/remove/:id', handleBookRemove); //:DB ID
app.put('/books/review/:id', handleBookReview); //:id body:{book w/ review}
app.get('/libraries', handleLibraryList); //?book-title


app.listen(PORT, () => console.log(`I am alive! Listening on ${PORT}`));