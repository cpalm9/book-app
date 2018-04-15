var User = require('../models/user')
var Group = require('../models/group')

// Create Group
exports.createGroup = (req, res) => {
    var db = req.db;
    var name = req.body.name;
    var description = req.body.description;
    var public = true;
    var password = req.body.password;
    var interests = [];
    var members = []

    var new_group = new Group({
        name: name,
        description: description,
        public: true,
        password: password,
        interests: interests,
        members: members
    })
    new_group.save(err =>{
        if(err){
            console.log(err);
        }
        res.send({
            success: true,
            message: 'Group Saved',
            group: new_group
        })
    })
}

// Get Groups
exports.getGroups = (req, res) => {
    Group.find({}, 'name members', (err, groups) => {
        if (err) res.send(err)
        res.send({
            groups:groups
        })
    })
}

// Add members to group
exports.addMembers = (req, res) => {
    Group.findById(req.params.id, (err, group) => {
        if (err) res.send(err)
        if(Array.isArray(req.body.members)){
            for(var x = 0; x < req.body.members.length; x++) {
                group.members.push(req.body.members[x].id)
            }
        }
        else{ group.members.push(req.body.members.id)}

        User.findOne({name: req.body.members.name}, '_id name username groups', (err, user) => {
            user.groups.push(group._id)
            user.save()
        })
        group.save(err => {
            if(err) res.send(err)
            res.send({
                success: true,
                group: group
            })
        })
    })
}

exports.getGroupById = (req,res) => {
    Group.findById(req.params.id, (err, group) => {
        if (err) res.send(err)
        res.send({
            status: 200,
            group: group
        })
    })
}

exports.booksToRead = (req, res) => {
    Group.findById(req.body.group, (err, group) => {
        if (err) res.send(err)
        group.booksToRead.push(req.body.book)
        group.save(err=>{
            if(err) res.send(err)
            res.send({
                status: 200,
                group: group
            })
        })
    })
}

exports.changeVote = (req, res) => {
    Group.findById(req.body.group._id, (err, group) => {
        if(err) res.send(err)
        group.booksToRead.forEach(el => {
            if(el.title === req.body.book.title){
                if(req.body.id == 1){
                    el.upVote += 1
                }
                else{
                    el.downVote += 1
                }
            }
        });
        group.save(err => {
            if(err) res.send(err)
            res.send({
                status: 200,
                group: group
            })
        })
    })
}

exports.startReading = (req, res) => {
    Group.findById(req.body.group._id, (err, group) => {
        if(err) res.send(err)
        var new_book = {
            title: req.body.book.title,
            author: req.body.book.author,
            thumbnail: req.body.book.thumbnail,
        }
        group.currentBook = new_book
        
        //Delete book in voting list once it is selected as the current reading book
        var index = 0
        for(var i = 0; i < group.booksToRead.length; i++)
        {
            if(group.currentBook.title == group.booksToRead[i].title){
                index = i;
            }
        }
        group.booksToRead.splice(index, 1)

        group.save(err => {
            if(err) res.send(err)
            res.send({
                status: 200,
                group: group,
                book: new_book
            })
        })
    })
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

exports.currentReadingList = (req, res) => {
    var array = []
    Group.find({}, 'name currentBook', (err, groups)=> {
        groups.forEach(el => {
            if(el.currentBook.title !== undefined){
                array.push(el.currentBook)
            }
        })
        res.send({status: 'success', bookList: array})
    })
}