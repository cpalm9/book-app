var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var GroupSchema = new Schema({
    name: String,
    description: String,
    public: Boolean,
    password: String,
    interests: [String],
    members: [{type:mongoose.Schema.Types.ObjectId, ref: 'User'}],
    booksToRead: [{book:{type:mongoose.Schema.Types.ObjectId, ref:'Book'}, position: Number}]
  });

var Group = mongoose.model("Group", GroupSchema);
module.exports = Group;