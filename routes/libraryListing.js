'use strict'

require('dotenv').config();
const Book = require('../Models/bookModel');
const Library = require('../Models/libraryModel');

async function findLibraries(arr) {

}

async function handleLibraryList(req, res) {
  try {
    let bookResults = await Book.find({
      title: { $regex: req.query.title, $options: 'i' }
    });
    let libraries = await Promise.all(bookResults.map(async result => {
      let libraryResult = await Library.find({ charter: result.libraryCharter })
      let library = libraryResult[0];
      let modLibrary = {
        _id: library._id,
        geolocation: library.geolocation,
        libraryName: library.libraryName,
        charter: library.charter,
        title: result.title,
        __v: library.__v
      };
      console.log(modLibrary);
      return modLibrary;
    }))
    res.status(200).send(libraries);
  } catch (err) {
    console.error(err)
    res.status(500).send('Something went wrong matching your book results!')
  }
}

module.exports = handleLibraryList;
