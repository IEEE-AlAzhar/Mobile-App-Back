const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  code: {
    type: String,
    required: [true, "User code is required!"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "User name is required!"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required!"],
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
  },
  image: {
    type: String,
  },
  role: {
    type: String,
  },
  type: {
    type: String,
    required: [true, "user type is required!"],
  },
  committee: {
    type: String,
    required: [true, "user committee is required!"],
  },
  feedbacks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Feedback",
    },
  ],
  achievements: [
    {
      type: Schema.Types.ObjectId,
      ref: "Achievement",
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
