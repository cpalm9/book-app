var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NotificationSchema = new Schema({
  comment: String,
  datePosted: {type: Date, default: Date.now},
  group: [{type: mongoose.Schema.Types.ObjectId, ref: 'Group'}],
  messageLikes: {type: Number, default:Math.floor(Math.random() * 20)},
  user: String
})

var Notification = mongoose.model("Notification", NotificationSchema);
module.exports = Notification;