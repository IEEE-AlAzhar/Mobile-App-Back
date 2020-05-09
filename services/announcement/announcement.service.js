const CoreService = require("../core.service.js");
const Announcement = require("../../models/Announcement.model");

class AnnouncementService extends CoreService {
  constructor() {
    super()
    this.initialize(Announcement, "Announcement");
  }
}

module.exports = AnnouncementService;
