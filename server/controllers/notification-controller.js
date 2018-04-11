var Group = require('../models/group');
var Notification = require('../models/notifications')

exports.getNotifications = (req, res) => {
  Notification.find({}, 'comment group id datePosted messageLikes user', (err, notifications) => {
    if(err) res.send(err)
    res.send({
      notifications: notifications
    })
  })
}

exports.createNotification = (req, res) => {
  var db = req.db;
  var comment = req.body.comment
  var date = req.body.date
  var group = req.body.group
  var user = req.body.user

  new_notification = new Notification({
    comment: comment,
    datePosted: date,
    group: group,
    user: user
  })
  new_notification.save((err) => {
    if(err) {
      res.send(err)
    }
    res.send({
      success: true,
      messsage: 'Notification Saved!',
      notification: new_notification
    })
  })
}