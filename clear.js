'use strict'

const mongoose = require('mongoose');
require('dotenv').config();
const Library = require('./Models/libraryModel.js');
const Book = require ('./Models/bookModel.js');

async function clear() {
  mongoose.connect(process.env.DB_URL);
  try{
    await Book.deleteMany({});
    console.log('Books cleared!');
    await Library.deleteMany({});
    console.log('Libraries cleared!');
  } catch (err){
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
}

clear();