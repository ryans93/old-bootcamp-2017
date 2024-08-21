var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  author: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },

},{timestamps: true});

var comment = mongoose.model("Comment", CommentSchema);

module.exports = comment;