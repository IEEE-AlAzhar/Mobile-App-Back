const express = require("express");
const server = express.Router();
const verifyToken = require("./verifyToken");

// require models
const Committee = require("../models/Committee.model");

// require controllers
const getCommittees = require("./committee/getCommittees");
const addCommittee = require("./committee/addCommittee");
const editCommittee = require("./committee/editCommittee");
const deleteCommittee = require("./committee/deleteCommittee");

// Announcement end-points
server.get("/list", verifyToken(), getCommittees(Committee));
server.post("/add", verifyToken(), addCommittee(Committee));
server.put("/:id", verifyToken(), editCommittee(Committee));
server.delete("/:id", verifyToken(), deleteCommittee(Committee));

module.exports = server;
