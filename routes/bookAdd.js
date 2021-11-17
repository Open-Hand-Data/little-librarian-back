'use strict'

const Book = require('../Models/bookModel');
require('dotenv').config();

// apiurl.heroku.com/books/add/:charter
// data: {book obj}
// params: charter

async function handleAddBook(req, res){
  try{
    let newBook = await Book.create({
      libraryCharter: req.params.charter,
      title: req.body.title,
      author: req.body.author || '',
      description: req.body.description,
      thumbnail: req.body.thumbnail || ''
    });
    res.status(200).send(newBook);
  }catch (err){
    console.error(err)
    res.status(500).send('Something went wrong adding your book!')
  }
}

module.exports = handleAddBook;
