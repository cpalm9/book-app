var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    username: String,
    password: String,
    groups: [{type:mongoose.Schema.Types.String, ref: 'Group'}]
})
var User = mongoose.model("User", UserSchema);
module.exports = User;