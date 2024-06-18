const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: null
  },
  finished: {
    type: Boolean,
    required: true,
    default: false
  },
  deadline: {
    type: Date,
  }
});

const TodoItem = mongoose.model("todo", ItemSchema);
module.exports = TodoItem;