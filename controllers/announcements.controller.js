const express = require("express");
const server = express.Router();
const verifyToken = require("../helpers/verifyToken");

// require models
const Announcement = require("../models/Announcement.model");

// require controllers
const getAnnouncements = require("../services/announcement/getAnnouncements");
const addAnnouncement = require("../services/announcement/addAnnouncement");
const editAnnouncement = require("../services/announcement/editAnnouncement");
const deleteAnnouncement = require("../services/announcement/deleteAnnouncement");

// Announcement end-points
server.get("/list", verifyToken(), getAnnouncements(Announcement));
server.post("/new", verifyToken(), addAnnouncement(Announcement));
server.put("/:id", verifyToken(), editAnnouncement(Announcement));
server.delete("/:id", verifyToken(), deleteAnnouncement(Announcement));

module.exports = server;
