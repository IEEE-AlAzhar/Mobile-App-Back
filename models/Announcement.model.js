const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// creating announcement schema
const announcementSchema = new Schema({
  id: {
    type: String,
    required: [true, "Announcement id is required!"],
    unique: true,
  },
  title: {
    type: String,
    required: [true, "Announcement title is required!"],
  },
  body: {
    type: String,
    required: [true, "Announcement body is required!"],
  },
  date: {
    type: Date,
    default: Date.now,
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
