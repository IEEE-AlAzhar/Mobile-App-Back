const express = require("express");
const server = express.Router();
const verifyToken = require("../helpers/verifyToken");

// require models
const User = require("../models/User.model");
const Achievement = require("../models/Achievement.model");
const Feedback = require("../models/Feedback.model");

// require controllers
const getUsers = require("../services/user/getUsers");
const createUser = require("../services/user/createUser");
const login = require("../services/user/login");
const getUser = require("../services/user/getUser");
const changeUserImage = require("../services/user/changeUserImage");
const changeUserPhone = require("../services/user/changeUserPhone");
const deleteUser = require("../services/user/deleteUser");
const addAchievement = require("../services/user/addAchievement");
const editAchievement = require("../services/user/editAchievement");
const deleteAchievement = require("../services/user/deleteAchievement");
const addFeedback = require("../services/user/addFeedback");
const editFeedback = require("../services/user/editFeedback");
const deleteFeedback = require("../services/user/deleteFeedback");

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
