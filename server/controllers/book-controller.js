var Book = require('../models/book');

exports.getBooks = (req, res) => {
    Book.find({}, 'title description author rating', function (error, books) {
        if (error) { console.error(error); }
        res.send({
          books: books
        })
      }).sort({_id:-1})
}
exports.createBook = (req, res) => {
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
}
exports.getSingleBook = (req, res) => {
    var db = req.db;
    Book.findById(req.params.id, 'title description author rating', function(error, book){
        if (error){console.log(error)}
        res.send(book);
    })
}
exports.updateBook = (req, res) => {
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
}
exports.deleteBook = (req, res) => {
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
}