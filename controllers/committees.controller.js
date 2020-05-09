const express = require("express");
const server = express.Router();
const verifyToken = require("../helpers/verifyToken");

const CommitteeService = require("../services/committee/committee.service.js");
let committeeService = new CommitteeService();

server.get("/list", verifyToken(), committeeService.listRecords);
server.post("/new", verifyToken(), committeeService.createRecord);
server.put("/:id", verifyToken(), committeeService.updateRecord);
server.delete("/:id", verifyToken(), committeeService.deleteRecord);

module.exports = server;
