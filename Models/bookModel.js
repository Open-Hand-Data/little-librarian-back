'use strict';

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  libraryCharter: String,
  title: String,
  author: String,
  description: String,
  thumbnail: String
});

const Book = mongoose.model('Books', bookSchema);

module.exports = Book;