const request = require('request');
const bookController = require('../controllers/book-controller');
const googleBooks = require('../controllers/google-books');
const userController = require('../controllers/user-controller');
const groupController = require('../controllers/group-controller');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
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
    app.post('/user', userController.createUser);

    // Get Users
    app.get('/users', userController.getUsers);

    // Create Group
    app.post('/group', groupController.createGroup);

    // Get Groups
    app.get('/groups', groupController.getGroups);

    // Add Members to Group
    app.put('/group/add/:id', groupController.addMembers);

    app.post('/register', (req, res) => {
        console.log(req.body);
        var login = new User();
        User.findOne({"username": req.body.username}, (err,user_data)=>{
            if(err){
                console.log(err)
            }
            if(user_data){
                return res.json({
                    status: 409,
                    message: "User already exists"
                })
            }
            console.log(req.body, 44)
            login.username = req.body.username;
            login.password = req.body.password;
            login.name = req.body.name;
            login.groups = req.body.groups;
            console.log(login, 49);
            login.save((err, login_data)=>{
                if(err){
                    return res.status(400).send(err);
                }
                res.json({
                    status: 200,
                    message: "Registered",
                    data: login
                })
            })
        })
    })

    app.post('/login', (req, res)=>{
        User.findOne({"username": req.body.username, "password": req.body.password}, (err, user_data)=>{
            if(err || !user_data){
                return res.status(401).json({
                    status: 401,
                    message: "Invalid username and password"
                })
            } else {
                const payload = {
                    username: user_data.username
                }
                var token = jwt.sign(payload, app.get('superSecret'), {
                    expiresIn: 60*60*24
                });
            res.status(200).json({
                message: "You have logged in",
                token: token
            })
            }
        })
    })

    app.use((req,res,next)=>{
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        if(token){
            jwt.verify(token, app.get('superSecret'), (err, decoded)=>{
                if(err){
                    return res.json({status: 403, success: false, message: 'Failed to authenticate token'})
                }
                else {
                    req.decoded = decoded;
                    next();
                }
            })
        }
        else {
            return res.json({
                status: 403,
                success: false,
                message: 'No token provided'
            })
        }
    })
}