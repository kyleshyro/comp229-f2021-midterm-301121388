/*
File: book.js
Name: Rajaofera Tiana Andriamasinalivao
ID: 301121388
Date: 28-Oct-2021
*/

let mongoose = require('mongoose');

// create a model class
let Book = mongoose.Schema({
    Title: String,
    Description: String,
    Price: Number,
    Author: String,
    Genre: String
},
{
  collection: "books"
});

module.exports = mongoose.model('Book', Book);
