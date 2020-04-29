const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create feedback Schema
const FeedbackSchema = new Schema({
  author: {
    type: String,
    required: [true, "author is required!"],
  },
  content: {
    type: String,
    required: [true, "content is required!"],
  },
});

// Create achievement Schema
const AchievementSchema = new Schema({
  title: {
    type: String,
    required: [true, "title is required!"],
  },
  description: {
    type: String,
    required: [true, "description is required!"],
  },
});

// creating user schema
const userSchema = new Schema({
  token: {
    type: String,
  },
  user: {
    code: {
      type: String,
      required: [true, "User code is required!"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Username is required!"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required!"],
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      required: [true, "user role is required!"],
    },
    type: {
      type: String,
      required: [true, "user type is required!"],
    },
    committee: {
      type: String,
      required: [true, "user committee is required!"],
    },
    feedbacks: FeedbackSchema,
    achievements: AchievementSchema,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
