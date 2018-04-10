var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NotificationSchema = new Schema({
  comment: String,
  datePosted: {type: Date, default: Date.now},
  group: [{type: mongoose.Schema.Types.ObjectId, ref: 'Group'}]
})