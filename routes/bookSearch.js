'use strict'

const axios = require('axios');
require('dotenv').config();

//apiurl.heroku.com/books/search?title+of+book
// req{query: String}

async function handleBookSearch(req, res) {
  try {
    let titleSearch = req.query.title.replace(/\s+/g, '+');
    let reply = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${titleSearch}&key=${process.env.GOOGLE_BOOKS_API}`);
    let bookResults = reply.data.items.map(item => {
      let book = {
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors,
        description: item.volumeInfo.description || null,
        coverImg: item.volumeInfo.imageLinks || null
      };
      return book;
    })
    res.status(200).send(bookResults);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong retrieving book results!');
  }
}

module.exports = handleBookSearch;