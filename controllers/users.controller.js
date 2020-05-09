const express = require("express");
const server = express.Router();
const verifyToken = require("./verifyToken");

// require models
const User = require("../models/User.model");
const Achievement = require("../models/Achievement.model");
const Feedback = require("../models/Feedback.model");

// require controllers
const getUsers = require("./user/getUsers");
const createUser = require("./user/createUser");
const login = require("./user/login");
const getUser = require("./user/getUser");
const changeUserImage = require("./user/changeUserImage");
const changeUserPhone = require("./user/changeUserPhone");
const deleteUser = require("./user/deleteUser");
const addAchievement = require("./user/addAchievement");
const editAchievement = require("./user/editAchievement");
const deleteAchievement = require("./user/deleteAchievement");
const addFeedback = require("./user/addFeedback");
const editFeedback = require("./user/editFeedback");
const deleteFeedback = require("./user/deleteFeedback");

// user end-points
server.get("/list", verifyToken(), getUsers(User));
server.get("/:_id", verifyToken(), getUser(User));
server.post("/create", verifyToken(), createUser(User));
server.put("/:_id/image", verifyToken(), changeUserImage(User));
server.put("/:_id/phone", verifyToken(), changeUserPhone(User));
server.post("/login", login(User));
server.delete("/:_id", verifyToken(), deleteUser(User));
server.post(
  "/:id/achievements/new",
  verifyToken(),
  addAchievement(User, Achievement)
);
server.put(
  "/achievements/:achievementId",
  verifyToken(),
  editAchievement(Achievement)
);
server.delete(
  "/:id/achievements/:achievementId",
  verifyToken(),
  deleteAchievement(Achievement, User)
);
server.post("/:id/feedbacks/new", verifyToken(), addFeedback(User, Feedback));
server.put("/:id/feedbacks/:feedbackId", verifyToken(), editFeedback(Feedback));
server.delete(
  "/:id/feedbacks/:feedbackId",
  verifyToken(),
  deleteFeedback(Feedback, User)
);

module.exports = server;
