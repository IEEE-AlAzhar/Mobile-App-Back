const express = require("express");
const server = express.Router();
const verifyToken = require("../helpers/verifyToken");

const AnnouncementService = require("../services/announcement/announcement.service.js");
let announcementService = new AnnouncementService();

server.get("/list", verifyToken(), announcementService.listRecords);
server.post("/new", verifyToken(), announcementService.createRecord);
server.put("/:id", verifyToken(), announcementService.updateRecord);
server.delete("/:id", verifyToken(), announcementService.deleteRecord);

module.exports = server;
