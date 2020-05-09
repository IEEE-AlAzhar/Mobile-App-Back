const CoreService = require("../core.service.js");
const Committee = require("../../models/Committee.model");

class CommitteeService extends CoreService {
  constructor() {
    super();
    this.initialize(Committee, "Committee");
  }
}

module.exports = CommitteeService;
