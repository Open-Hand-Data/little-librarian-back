'use strict'

require('dotenv').config();
const Book = require('../Models/bookModel');

async function handleBookRemove (req, res) {
    try {
        let bookRemove = await Book.deleteOne({
            _id: req.params.id,
        });
        res.status(200).send(bookRemove);
    } catch (err) {
        console.error(err)
        res.status(500).send('Something went wrong removing your book!')
    }
}

module.exports = handleBookRemove;