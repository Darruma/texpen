const mongoose = require('mongoose')
let PostSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "",
  },
  text_box_input: {
    type: String,
    default: "",
  },
  content: {
    type: Array,
    default: [],
  },
  url: {
    type: String,
    default: "",
  },
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
