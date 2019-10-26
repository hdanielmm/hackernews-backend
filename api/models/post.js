const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: String,
  url: String,
  createdDate: Date
});

module.exports = mongoose.model('Post', postSchema);