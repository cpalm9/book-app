var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var GroupSchema = new Schema({
    name: String,
    members: [{type:mongoose.Schema.Types.ObjectId, ref: 'User'}]
  });

var Group = mongoose.model("Group", GroupSchema);
module.exports = Group;