const express = require("express");
const server = express.Router();
const jwt = require("jsonwebtoken");
const config = require("../config");

// require models
const User = require("../models/User.model");
const Achievement = require("../models/Achievement.model");
const Feedback = require("../models/Feedback.model");

// require controllers
const verifyToken = require("./verifyToken");
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
server.get("/list", verifyToken(jwt, config), getUsers(User));
server.get("/:_id", verifyToken(jwt, config), getUser(User));
server.post("/create", verifyToken(jwt, config), createUser(User));
server.put("/:_id/image", verifyToken(jwt, config), changeUserImage(User));
server.put("/:_id/phone", verifyToken(jwt, config), changeUserPhone(User));
server.post("/login", login(User, jwt, config));
server.delete("/:_id", verifyToken(jwt, config), deleteUser(User));
server.post(
  "/:id/achievements/new",
  verifyToken(jwt, config),
  addAchievement(User, Achievement)
);
server.put(
  "/achievements/:achievementId",
  verifyToken(jwt, config),
  editAchievement(Achievement)
);
server.delete(
  "/:id/achievements/:achievementId",
  verifyToken(jwt, config),
  deleteAchievement(Achievement, User)
);
server.post(
  "/:id/feedbacks/new",
  verifyToken(jwt, config),
  addFeedback(User, Feedback)
);
server.put(
  "/:id/feedbacks/:feedbackId",
  verifyToken(jwt, config),
  editFeedback(Feedback)
);
server.delete(
  "/:id/feedbacks/:feedbackId",
  verifyToken(jwt, config),
  deleteFeedback(Feedback, User)
);

module.exports = server;
