'use strict';

const mongoose = require('mongoose');
const Book = require('./Models/bookModel');
const Library = require('./Models/libraryModel');
require('dotenv').config();

async function seed() {
  mongoose.connect(process.env.DB_URL);

  try {
    await Book.create({
      libraryCharter: '15715',
      title: 'Crime and Punishment',
      author: 'Fyodor Dostoyevsky',
      description: 'Crime and Punishment focuses on the mental anguish and moral dilemmas of Rodion Raskolnikov, an impoverished ex-student in Saint Petersburg who formulates a plan to kill an unscrupulous pawnbroker for her money.',
      thumbnail: 'https://placekitten.com/200/300'
    });

    await Book.create({
      libraryCharter: '15715',
      title: 'Salt Fat Acid Heat',
      author: 'Samin Nosrat',
      description: 'Salt Fat Acid Heat: Mastering the Elements of Good Cooking is a 2017 cookbook written by American chef Samin Nosrat and illustrated by Wendy MacNaughton. It inspired the 2018 American cooking documentary Salt Fat Acid Heat.',
      thumbnail: 'https://placekitten.com/200/300'
    });

    await Book.create({
      libraryCharter: '15715',
      title: 'Dr. No',
      author: 'Ian Fleming',
      description: 'After recovering from serious poisoning inflicted by the SMERSH agent Rosa Klebb (in From Russia, with Love) the MI6 agent James Bond is sent by his superior, M, on an undemanding mission to the British Colony of Jamaica.',
      thumbnail: 'https://placekitten.com/200/300'
    });

    await Book.create({
      libraryCharter: '59905',
      title: 'Dr. No',
      author: 'Ian Fleming',
      description: 'After recovering from serious poisoning inflicted by the SMERSH agent Rosa Klebb (in From Russia, with Love) the MI6 agent James Bond is sent by his superior, M, on an undemanding mission to the British Colony of Jamaica.',
      thumbnail: 'https://placekitten.com/200/300'
    });

    await Library.create({
      geolocation: { latitude: 47.695486, longitude: -122.289607 },
      libraryName: 'Janette Rosebrook #15715 Seattle WA',
      charter: '15715'
    })

    await Library.create({
      geolocation: { latitude: 47.7171019, longitude: -122.3204324 },
      libraryName: 'Janette Rosebrook #15715 Seattle WA',
      charter: '59905'
    })

    console.log('Database seeded with 4 books and 2 libraries!');

  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }

}

seed();