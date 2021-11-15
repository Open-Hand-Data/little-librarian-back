'use strict'

//Dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { response } = require('express');

//setup express and middleware
const app = express();
app.use(cors());
app.use(express.json());

// const Book = require('Models/)

const PORT = process.env.PORT || 3001

//Connect to DB and proof of connection
mongoose.connect(process.env.SERVER_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
  console.log('Mongoose is connected!');
});

//Request Paths
app.get('/test', (req, res) => res.status(200).send('I AM ALIVE! Hello! :)'));


app.listen(PORT, () => console.log(`I am alive! Listening on ${3001}`));