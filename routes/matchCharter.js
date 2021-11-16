'use strict'

require('dotenv').config();
const Book = require('../Models/bookModel');

async function handleMatchCharter (req, res) {
    try {
        let charterMatch = await Book.find({
            libraryCharter: req.query.charter,
        });
        res.status(200).send(charterMatch);
    } catch (err) {
        console.error(err)
        res.status(500).send('Something went wrong matching your charter!')
    }
}

module.exports = handleMatchCharter;
