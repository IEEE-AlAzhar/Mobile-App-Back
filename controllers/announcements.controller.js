const express = require("express");
const server = express.Router();

const Announcement = require("../models/Announcement.model");

server.get("/list", async (req, res) => {
  try {
    let announcementsList = await Announcement.find({});
    res.json(announcementsList);
  } catch {
    res.status(500).json({ msg: "An error occurred" });
  }
});

server.post("/new", async (req, res) => {
  let { title, body, cover, date, type } = req.body;

  let AnnouncementItem = new Announcement({
    title,
    body,
    date,
    cover,
    date,
    type,
  });

  AnnouncementItem.save()
    .then((record) => {
      res.json(record);
    })
    .catch(() => {
      res.status(400).json({ msg: "An error occurred" });
    });
});

// Edit the record
server.put("/:id", (req, res) => {
  try {
    let id = req.params.id;

    let { title, body, cover, date, type } = req.body;

    Announcement.findByIdAndUpdate(
      id,
      { title, body, cover, date, type },
      { new: true }
    ).then((record) => {
      res.json(record);
    });
  } catch {
    res.json({ msg: "An error occurred" });
  }
});

// Delete the record
server.delete("/:id", (req, res) => {
  let id = req.params.id;

  Announcement.findByIdAndRemove(id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(() => {
      res.json({ msg: "An error occurred" });
    });
});

module.exports = server;
