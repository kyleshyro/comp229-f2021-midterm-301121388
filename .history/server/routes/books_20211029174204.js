/*
File: book.js
Name: Rajaofera Tiana Andriamasinalivao
ID: 301121388
Date: 28-Oct-2021
*/

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */

router.get('/', (req, res, next) => {
    // find all books in the books collection
    book.find((err, books) => {
        if (err) {
            return console.error(err);
        } else {
            res.render('books/index', {
                title: 'Favourite Books',
                books: books
            });
        }
    });

});

//  GET the Book Details page in order to add a new Book

router.get('/add', (req, res, next) => {

    res.render('books/details', { title: 'Add Book', books: '' });

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    let newBook = book({
        "Title": req.body.Title,
        "Price": req.body.Price,
        "Author": req.body.Author,
        "Genre": req.body.Genre
    });
    book.create(newBook, (err, book) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {

            //refresh the list of books
            res.redirect('/books');
        }
    });
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

    let id = req.params.id;

    book.findById(id, (err, bookToEdit) => {

        if (err) {
            console.log(err);
            res.end(err);
        } else {

            res.render('books/details', { title: 'Edit Book', books: bookToEdit });
        }
    })
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    let id = req.params.id;

    let editBook = book({
        "_id": id,
        "Title": req.body.Title,
        "Price": req.body.Price,
        "Author": req.body.Author,
        "Genre": req.body.Genre
    });

    book.updateOne({ _id: id }, editBook, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {

            //refresh the list of the books
            res.redirect('/books');
        }
    });

});

// GET - process the delete by book's id
router.get('/delete/:id', (req, res, next) => {

    let id = req.params.id;

    book.remove({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {

            //refresh the list of the books
            res.redirect('/books');
        }

    });
});


module.exports = router;












