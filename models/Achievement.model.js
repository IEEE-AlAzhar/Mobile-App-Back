const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const achievementSchema = new Schema({
  title: {
    type: String,
    required: [true, "Achievement title is required!"],
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  cover: {
    type: String,
  },
});

const Achievement = mongoose.model("Achievement", achievementSchema);
module.exports = Achievement;
