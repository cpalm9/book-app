const request = require('request');
const bookController = require('../controllers/book-controller');
const googleBooks = require('../controllers/google-books');
const userController = require('../controllers/user-controller');
const groupController = require('../controllers/group-controller');
const authController = require('../controllers/auth-controller');
const notificationController = require('../controllers/notification-controller');
var config = require('../config');
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

    // Create User
    // app.post('/user', userController.createUser);

    // Get Users
    app.get('/users', userController.getUsers);

    // Create Group
    app.post('/group', groupController.createGroup);

    // Get Groups
    app.get('/groups', groupController.getGroups);

    // Add Members to Group
    app.put('/group/add/:id', groupController.addMembers);
    // Get Google Books
    app.get('/google/books/:q', (req, res)=> {
        request({
            uri: 'https://www.googleapis.com/books/v1/volumes',
            qs: {
                q: req.params.q,
                key: config.key
            }
        }).pipe(res)
    })

    app.post('/register', authController.register);

    app.post('/login', authController.login);

    app.get('/notifications', notificationController.getNotifications);

    app.post('/notification', notificationController.createNotification);
    app.put('/user/update', userController.updateUser)

    app.get('/group/:id', groupController.getGroupById);
    app.put('/group/update-book-vote', groupController.booksToRead);
    app.put('/group/change-vote/:id', groupController.changeVote);
    app.put('/group/start-reading', groupController.startReading)

    app.get('/current-reading', groupController.currentReadingList)

    app.put('/user/group/update', userController.updateGroups)
}