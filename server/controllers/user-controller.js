var User = require('../models/user')
var Group = require('../models/group')

// Create a User
exports.createUser = (req,res) => {
    var db = req.db;
    var name = req.body.name;
    var username = req.body.username;
    var password = req.body.password;

    var new_user = new User({
        name: name,
        username: username,
        password: password
    })

    new_user.save(err =>{
        if(err){
            console.log(err);
        }
        res.send({
            success: true,
            message: 'User Saved',
            user: new_user
        })
    })
}

// Get a User
exports.getUsers = (req, res) => {
    User.find({}, 'name username password', function (error, users) {
        if (error) { console.error(error); }
        res.send({
          users: users
        })
      }).sort({_id:-1})
}

//Update User
exports.updateUser = (req, res) => {
    var userID = req.body.user.id
    User.findById(userID, 'name username readingList groups', (err, user) => {
        if(user.readingList){
            user.readingList.push(req.body.book)
        }
        user.save(err => {
            if(err) console.log(err)
            res.send({
                success: true, user: user
            })
        })
    })
}

exports.updateGroups = (req, res) => {
    var userID = req.body.user.id
    User.findById(userID, 'name username readingList groups', (err, user) => {
        user.save(err => {
            if(err) console.log(err)
            res.send({
                success: true, user: user, group: req.body.group
            })
        })
    })
}