const express = require("express");
const server = express.Router();

const User = require("../models/User.model");

server.get("/list", async (req, res) => {
  try {
    let usersList = await User.find({});
    res.json(usersList);
  } catch {
    res.status(500).json({ msg: "An error occurred" });
  }
});

server.get("/:id", async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    res.json(user);
  } catch {
    res.status(500).json({ msg: "An error occurred" });
  }
});

server.post("/register", async (request, response) => {
  let { code, name, email, phone, image, role, type, committee } = request.body;

  User.find({ email }).then((usr, err) => {
    if (usr.length > 0) {
      return response.status(400).json({ message: "User already exists" });
    } else {
      let user = new User({
        code,
        name,
        email,
        phone,
        image,
        role,
        type,
        committee,
      });

      user.save().then(() => {
        response.sendStatus(201);
      });
    }
  });
});

server.put("/:id/phone", (req, res) => {
  const { id } = req.params;
  const { phone } = req.body;
  User.findByIdAndUpdate(id, { $set: { "user.phone": phone } }, { new: true })
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
  User.findByIdAndUpdate(id, { $set: { "user.image": image } }, { new: true })
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

server.delete("/:id", ensureAuth, (request, response) => {
  let id = request.params.id;

  User.findByIdAndDelete(id).then(() => {
    response.sendStatus(200);
  });
});

module.exports = server;
