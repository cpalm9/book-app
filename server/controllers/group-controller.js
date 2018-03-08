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
    console.log(new_group)
}

// Get Groups
exports.getGroups = (req, res) => {
    Group.find({}, 'name', (err, groups) => {
        if (err) res.send(err)
        res.send({
            groups:groups
        })
    })
}

// Add members to group
exports.addMembers = (req, res) => {
    Group.findById(req.params.id, 'name members', (err, group) => {
        if (err) res.send(err)
        for(var x = 0; x < req.body.members.length; x++) {
            group.members.push(req.body.members[x])
        }
        group.save(err => {
            if(err) res.send(err)
            res.send({
                success: true,
                group: group
            })
        })
    })
}