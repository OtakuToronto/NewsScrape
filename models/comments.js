let mongoose = require('mongoose');
let Schema = mongoose.Schema; // Saves the Reference to the Schema Constructor Object

var commentSchema = new Schema({ // Using the Schema constructor, create a new CommentSchema object
  // `body` is of type String
  body: String

});

// This creates our model from the above schema, using mongoose's model method
var Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;