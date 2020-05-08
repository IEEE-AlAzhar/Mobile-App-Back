const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
  title: {
    type: String,
    required: [true, "title is required!"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  body: {
    type: String,
    required: [true, "body is required!"],
  },
});

const Feedback = mongoose.model("Feedback", FeedbackSchema);
module.exports = Feedback;
