const express = require("express");
const server = express.Router();
const verifyToken = require("../helpers/verifyToken");

const UserService = require("../services/user/user.service");
const AchievementService = require("../services/achievement/achievement.service");
const FeedbackService = require("../services/feedback/feedback.service");

let userService = new UserService();
let achievementService = new AchievementService();
let feedbackService = new FeedbackService();

server.post("/login", userService.login);
server.get("/logout", verifyToken(), userService.logout);
server.put("/:id", verifyToken(), userService.updateRecord);
server.get("/list", verifyToken(), userService.listRecords);
server.post("/new", verifyToken(), userService.createRecord);
server.get("/me/:id", verifyToken(), userService.getUserById);
server.delete("/:id", verifyToken(), userService.deleteRecord);
server.put("/:id/image", verifyToken(), userService.changeImage);
server.put("/:id/phone", verifyToken(), userService.changePhone);

server.post(
  "/:id/achievements/new",
  verifyToken(),
  achievementService.createRecord
);
server.put("/achievements/:id", verifyToken(), achievementService.updateRecord);
server.delete(
  "/:id/achievements/:achievementId",
  verifyToken(),
  achievementService.deleteRecord
);

server.post("/:id/feedbacks/new", verifyToken(), feedbackService.createRecord);
server.put("/feedbacks/:id", verifyToken(), feedbackService.updateRecord);
server.delete(
  "/:id/feedbacks/:feedbackId",
  verifyToken(),
  feedbackService.deleteRecord
);

module.exports = server;
