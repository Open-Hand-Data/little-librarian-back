'use strict';

const mongoose = require('mongoose');

const librarySchema = new mongoose.Schema({
  geolocation: Object,
  libraryName: String,
  charter: String
});

const Library = mongoose.model('Libraries', librarySchema);

module.exports = Library;