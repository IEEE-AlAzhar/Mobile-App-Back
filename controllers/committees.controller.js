const express = require("express");
const server = express.Router();

const Committee = require("../models/Committee.model");

server.get("/list", async (req, res) => {
  try {
    let committeesList = await Committee.find({});
    res.json(committeesList);
  } catch {
    res.status(500).json({ msg: "An error occurred" });
  }
});

server.post("/new", async (req, res) => {
  let { name } = req.body;

  let committeeItem = new Committee({
    name,
  });

  committeeItem
    .save()
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

    let { name } = req.body;

    Committee.findByIdAndUpdate(
      id,
      { name },
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

  Committee.findByIdAndRemove(id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(() => {
      res.json({ msg: "An error occurred" });
    });
});

module.exports = server;
