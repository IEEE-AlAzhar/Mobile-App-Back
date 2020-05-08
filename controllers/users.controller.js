const express = require("express");
const server = express.Router();
const jwt = require("jsonwebtoken");
const config = require("../config");

const User = require("../models/User.model");
const Achievement = require("../models/Achievement.model");
const Feedback = require("../models/Feedback.model");

const verifyToken = require("./verifyToken");
const getUsers = require("./user/getUsers");
const createUser = require("./user/createUser");
const login = require("./user/login");
const getUser = require("./user/getUser");
const changeUserImage = require("./user/changeUserImage");
const changeUserPhone = require("./user/changeUserPhone");
const deleteUser = require("./user/deleteUser");

server.get("/list", getUsers(User));
server.get("/:_id", verifyToken(jwt, config), getUser(User));
server.post("/create", createUser(User));
server.put("/:_id/image", verifyToken(jwt, config), changeUserImage(User));
server.put("/:_id/phone", verifyToken(jwt, config), changeUserPhone(User));
server.post("/login", login(User, jwt, config));
server.delete("/:_id", verifyToken(jwt, config), deleteUser(User));

server.post("/:id/achievements/new", (req, res) => {
  const { id } = req.params;
  let { title, date, description, cover } = req.body;

  Achievement.create({ title, date, description, cover }).then(
    (achievement) => {
      User.findByIdAndUpdate(
        id,
        { $push: { achievements: achievement._id } },
        { new: true }
      )
        .then((data) => {
          if (data) {
            res.json(achievement);
          } else {
            res.status(404).json({
              msg: "User does not exist!",
            });
          }
        })
        .catch((err) =>
          res.status(500).json("An error occurred, please try again later!")
        );
    }
  );
});

server.put("/:id/achievements/:achievementId", (req, res) => {
  const { achievementId } = req.params;
  let { title, date, description, cover } = req.body;

  Achievement.findByIdAndUpdate(
    achievementId,
    { title, date, description, cover },
    { new: true }
  )
    .then((achievement) => {
      res.json(achievement);
    })
    .catch(() => {
      res.json({ msg: "An error occurred" });
    });
});

server.delete("/:id/achievements/:achievementId", (req, res) => {
  const { achievementId, id } = req.params;

  Achievement.findByIdAndRemove(achievementId)
    .then(() => {
      User.findByIdAndUpdate(id, {
        $pull: { achievements: achievementId },
      }).then(() => {
        res.sendStatus(200);
      });
    })
    .catch((err) => {
      res.status(400).json({ msg: "An error occurred" });
    });
});

server.post("/:id/feedbacks/new", (req, res) => {
  const { id } = req.params;
  let { title, date, body } = req.body;

  Feedback.create({ title, date, body }).then((feedback) => {
    User.findByIdAndUpdate(
      id,
      { $push: { feedbacks: feedback._id } },
      { new: true }
    )
      .then((data) => {
        if (data) {
          res.json(feedback);
        } else {
          res.status(404).json({
            msg: "User does not exist!",
          });
        }
      })
      .catch((err) =>
        res.status(500).json("An error occurred, please try again later!")
      );
  });
});

server.put("/:id/feedbacks/:feedbackId", (req, res) => {
  const { feedbackId } = req.params;
  let { title, date, body } = req.body;

  Feedback.findByIdAndUpdate(feedbackId, { title, date, body }, { new: true })
    .then((feedback) => {
      res.json(feedback);
    })
    .catch(() => {
      res.json({ msg: "An error occurred" });
    });
});

server.delete("/:id/feedbacks/:feedbackId", (req, res) => {
  const { feedbackId, id } = req.params;

  Feedback.findByIdAndRemove(feedbackId)
    .then(() => {
      User.findByIdAndUpdate(id, {
        $pull: { feedbacks: feedbackId },
      }).then(() => {
        res.sendStatus(200);
      });
    })
    .catch((err) => {
      res.status(400).json({ msg: "An error occurred" });
    });
});

module.exports = server;
