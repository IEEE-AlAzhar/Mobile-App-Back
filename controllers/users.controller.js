const express = require("express");
const server = express.Router();

const User = require("../models/User.model");
const Achievement = require("../models/Achievement.model");
const Feedback = require("../models/Feedback.model");

server.get("/list", async (req, res) => {
  try {
    let usersList = await User.find({});
    res.json(usersList);
  } catch {
    res.status(500).json({ msg: "An error occurred" });
  }
});

server.get("/:id", async (req, res) => {
  User.findById(req.params.id)
    .populate("achievements")
    .populate("feedbacks")
    .then((record) => {
      res.json(record);
    })
    .catch(() => {
      res.status(500).json({ msg: "User not found" });
    });
});

server.post("/register", async (request, response) => {
  let { code, name, email, phone, image, role, type, committee } = request.body;

  User.find({ email }).then((usr, err) => {
    if (usr && usr.length > 0) {
      return response.status(400).json({ msg: "User already exists" });
    } else {
      User.create({
        code,
        name,
        email,
        phone,
        image,
        role,
        type,
        committee,
      })
        .then((record) => {
          response.json(record);
        })
        .catch((err) => {
          console.log(err.message);
          response.status(500).json({
            msg: "An error occurred",
          });
        });
    }
  });
});

server.put("/:id/phone", (req, res) => {
  const { id } = req.params;
  const { phone } = req.body;
  User.findByIdAndUpdate(id, { $set: { phone: phone } }, { new: true })
    .then((data) => {
      if (data) {
        res.json({ phone: data.user.phone });
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

server.put("/:id/image", (req, res) => {
  const { id } = req.params;
  const { image } = req.body;
  User.findByIdAndUpdate(id, { $set: { image: image } }, { new: true })
    .then((data) => {
      if (data) {
        res.json({ image: data.user.image });
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

server.delete("/:id", (request, response) => {
  let id = request.params.id;

  User.findByIdAndDelete(id).then(() => {
    response.sendStatus(200);
  });
});

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
        $pull: { achievements: achievementId }
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

  Feedback.create({ title, date, body }).then(
    (feedback) => {
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
    }
  );
});

server.put("/:id/feedbacks/:feedbackId", (req, res) => {
  const { feedbackId } = req.params;
  let { title, date, body } = req.body;

  Feedback.findByIdAndUpdate(
    feedbackId,
    { title, date, body },
    { new: true }
  )
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
        $pull: { feedbacks: feedbackId }
      }).then(() => {
        res.sendStatus(200);
      });
    })
    .catch((err) => {
      res.status(400).json({ msg: "An error occurred" });
    });
});


module.exports = server;
