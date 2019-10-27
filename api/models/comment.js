const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  post: { 
    require: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  },
  body: {
    type: String,
    default: "Nothing to say"
  },
  createdDate: Date
});

module.exports = mongoose.model('Comment', commentSchema);