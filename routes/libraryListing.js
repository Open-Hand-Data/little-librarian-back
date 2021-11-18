'use strict'

require('dotenv').config();
const Book = require('../Models/bookModel');
const Library = require('../Models/libraryModel');

async function findLibraries (arr) {

}

async function handleLibraryList(req, res) {
  try {
    let bookResults = await Book.find({
      title: {$regex: req.query.title, $options: 'i'}
    });
    let libraries = await Promise.all(bookResults.map(result => Library.find({ charter: result.libraryCharter })))
    libraries = libraries.map(library => library[0]);
    res.status(200).send(libraries);
  } catch (err) {
    console.error(err)
    res.status(500).send('Something went wrong matching your book results!')
  }
}

module.exports = handleLibraryList;
