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