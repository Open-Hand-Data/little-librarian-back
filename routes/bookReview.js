'use strict'

require('dotenv').config();
const Book = require('../Models/bookModel');

async function handleBookReview (req, res) {
    try {
        let bookReview = await Book.updateOne({_id: req.params.id}, {review: req.body.review});
        res.status(200).send(bookReview);
    } catch (err) {
        console.error(err)
        res.status(500).send('Something went wrong updating your book!')
    }
}

module.exports = handleBookReview;