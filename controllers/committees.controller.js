const express = require("express");
const server = express.Router();
const verifyToken = require("../helpers/verifyToken");

// require models
const Committee = require("../models/Committee.model");

// require controllers
const getCommittees = require("../services/committee/getCommittees");
const addCommittee = require("../services/committee/addCommittee");
const editCommittee = require("../services/committee/editCommittee");
const deleteCommittee = require("../services/committee/deleteCommittee");

// committees end-points
server.get("/list", verifyToken(), getCommittees(Committee));
server.post("/new", verifyToken(), addCommittee(Committee));
server.put("/:id", verifyToken(), editCommittee(Committee));
server.delete("/:id", verifyToken(), deleteCommittee(Committee));

module.exports = server;
