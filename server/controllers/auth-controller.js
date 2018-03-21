var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');
var User = require('../models/user')

exports.register = (req,res) => {
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  var db = req.db;
  var name = req.body.name;
  var username = req.body.username;
  var password = req.body.password;

  User.create({
    name: name,
    username: username,
    password: password
  }, (err, user) => {
    var token = jwt.sign({id: user._id}, config.secret, {
      expiresIn: 86400
    });
    res.send({
      status: 200,
      token: token
    })
  })
}

exports.login = (req,res) => {
  User.findOne({username: req.body.username}, (err, user) => {
    if(err) return res.send({status: 500, message: 'Not found'})
    if(!user) return res.send({status: 404, message: 'Not Found'})

    // var validPassword = bcrypt.compareSync(req.body.password, user.password);
    // if (!validPassword) return res.send({status: 401, token: ''})
    console.log(user.password, req.body.password)
    if (user.password !== req.body.password) return res.send({status: 401, token: ''})
    var token = jwt.sign({id: user._id }, config.secret, {
      expiresIn: 86400
    })
    console.log(token)
    res.send({status: 200, token: token})
  })
}

exports.logout = (req, res) => {
  res.status(200).send({ token: '' });
}