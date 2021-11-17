'use strict';

//Dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const verifyUser = require('./auth.js')

//setup express and middleware
const app = express();
app.use(cors());
app.use(express.json());

// integrates Auth0
function handleRequest(req, res, callbackFn){
  verifyUser(req, (error, user) => {
    if(error){
      response.send('invalid token, dawg')
    }else{
      callbackFn(req, res);
    }
  })
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
app.get('/testToken', (req, res) => handleRequest(req, res, ()=>res.status(200).send('VERIFIED')));
app.get('/test', (req, res) => res.status(200).send('I AM ALIVE! Hello! :)'));
app.get('/books/search', (req, res) => handleRequest(req, res, handleBookSearch)); //?title=
app.post('/books/add/:charter', (req, res) => handleRequest(req, res, handleAddBook)); //data:{book} :charter#
app.get('/books/catalogue', (req, res) => handleRequest(req, res, handleMatchCharter)); //?charter#
app.delete('/books/remove/:id', (req, res) => handleRequest(req, res, handleBookRemove)); //:DB ID
app.put('/books/review/:id', (req, res) => handleRequest(req, res, handleBookReview)); //:id body:{book w/ review}
app.get('/libraries', (req, res) => handleRequest(req, res, handleLibraryList)); //?book-title


app.listen(PORT, () => console.log(`I am alive! Listening on ${PORT}`));