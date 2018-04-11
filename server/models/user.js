var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    username: String,
    password: String,
    groups: [{type:mongoose.Schema.Types.ObjectId, ref: 'Group'}],
    readingList: [{
        title: String,
        description: String,
        author: String,
        thumbnail: String,
    }]
})
var User = mongoose.model("User", UserSchema);
module.exports = User;