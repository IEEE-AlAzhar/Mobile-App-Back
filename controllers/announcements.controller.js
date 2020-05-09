const express = require("express");
const server = express.Router();
const verifyToken = require("./verifyToken");

// require models
const Announcement = require("../models/Announcement.model");

// require controllers
const getAnnouncements = require("./announcement/getAnnouncements");
const addAnnouncement = require("./announcement/addAnnouncement");
const editAnnouncement = require("./announcement/editAnnouncement");
const deleteAnnouncement = require("./announcement/deleteAnnouncement");

// Announcement end-points
server.get("/list", verifyToken(), getAnnouncements(Announcement));
server.post("/create", verifyToken(), addAnnouncement(Announcement));
server.put("/:id", verifyToken(), editAnnouncement(Announcement));
server.delete("/:id", verifyToken(), deleteAnnouncement(Announcement));

module.exports = server;
