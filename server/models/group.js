var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var GroupSchema = new Schema({
    name: String,
    description: String,
    public: Boolean,
    password: String,
    interests: [String],
    members: [{type:mongoose.Schema.Types.ObjectId, ref: 'User'}],
    booksToRead: [{
      title: String,
      description: String,
      author: String,
      thumbnail: String,
      upVote: {type:Number, default: 0},
      downVote: {type:Number, default: 0},
    }],
    currentBook: {
      title: String,
      description: String,
      author: String,
      thumbnail: String,
    }
  });

var Group = mongoose.model("Group", GroupSchema);
module.exports = Group;