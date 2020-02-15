const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
  userId: Number,
  id: Number,
  title: String,
  completed: Boolean
});

const TodoModel = mongoose.model("Todo", TodoSchema);

module.exports = { TodoSchema, TodoModel };
