const request = require('request');
const bookController = require('../controllers/book-controller');
const googleBooks = require('../controllers/google-books');
module.exports = function(app){
    // Create a book
    app.post('/book', bookController.createBook);
    
    // Get all books
    app.get('/books', bookController.getBooks);
    
    // Get single book
    app.get('/book/:id', bookController.getSingleBook);
    
    // Update book
    app.put('/book/:id', bookController.updateBook);
    
    // Delete Book
    app.delete('/book/:id', bookController.deleteBook);
    
    // Get Google Books
    app.get('/google/books/:q', googleBooks.searchGoogleBooks);
}