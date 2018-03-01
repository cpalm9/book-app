const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const request = require('request');
var Book = require('../models/book');

// DB connection
mongoose.connect('mongodb://localhost:27017/books');
var db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error"));
db.on("open", function(callback){
    console.log("Connection Successful");
})

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send(
        [
            {
                id: 1,
                title: "Lord of the Flies",
                description: "A book about kids that kill each other",
                author: "",
                rating: 8
            },
            {
                id: 2,
                title: "Of Mice and Men",
                description: "Good book. Read it in high school",
                author: "John Steinbeck",
                rating: 10
            }
        ]
    )
})
// Create a book
app.post('/book', (req, res) => {
    var db = req.db;
    var title = req.body.title;
    var description = req.body.description;
    var author = req.body.author;
    var rating = req.body.rating;

    var new_book = new Book({
        title: title,
        description: description,
        author: author,
        rating: rating
    })
    new_book.save(function(error){
        if (error){
            console.log(error);
        }
        res.send({
            success: true,
            message: "Book saved"
        })
    })
})

// Get all books
app.get('/books', (req, res) => {
    Book.find({}, 'title description author rating', function (error, books) {
      if (error) { console.error(error); }
      res.send({
        books: books
      })
    }).sort({_id:-1})
  })

// Get single book
app.get('/book/:id', (req, res) =>{
    console.log(req.params)
    var db = req.db;
    Book.findById(req.params.id, 'title description author rating', function(error, book){
        if (error){console.log(error)}
        res.send(book);
    })
})

// Update book
app.put('/book/:id', (req,res) =>{
    var db = req.db;
    Book.findById(req.params.id, 'title description author rating', function(err, book){
        if (err) {
            console.log(err)
        }
        book.title = req.body.title;
        book.description = req.body.description;
        book.author = req.body.author;
        book.rating = req.body.rating;

        book.save(function(err){
            if(err){
                console.log(err)
            }
            res.send({
                success: true
            })
        })
    })
})

// Delete Book
app.delete('/book/:id', (req, res)=>{
    var db = req.db;
    Book.remove({
        _id: req.params.id
    }, (err, book)=>{
        if(err){
            res.send(err)
        }
        res.send({
            success: true
        })
    })
})

// Get Google Books
app.get('/google/books/:q', (req, res)=> {
    request({
        uri: 'https://www.googleapis.com/books/v1/volumes',
        qs: {
            q: req.params.q,
            key: ""
        }
    }).pipe(res)
})
app.listen(process.env.PORT || 8081)