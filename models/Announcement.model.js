const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// creating announcement schema
const announcementSchema = new Schema({
  title: {
    type: String,
    required: [true, "Announcement title is required!"],
  },
  body: {
    type: String,
    required: [true, "Announcement body is required!"],
  },
  date: {
    type: Date
  },
  type: {
    type: String,
    default: "general",
  },
  cover: {
    type: String,
  },
});

const Announcement = mongoose.model("Announcement", announcementSchema);
module.exports = Announcement;
