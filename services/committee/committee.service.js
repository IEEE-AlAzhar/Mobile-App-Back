const CoreService = require("../core.service.js");
const Committee = require("../../models/Committee.model");
const User = require("../../models/User.model");

class CommitteeService extends CoreService {
  constructor() {
    super();
    this.initialize(Committee, "Committee");
    this.deleteRecord = this.deleteRecord.bind(this);
  }

  deleteRecord(req, res) {
    const { id } = req.params;

    this.db.findById(id).then((committee) => {
      // If there's any user has this committee --> send error
      User.find({ committee: committee.name }).then((users) => {
        if (users && users.length > 0) {
          res.status(400).json({
            msg:
              "There's users on this committee, please remove users first then retry !",
          });
        } else {
          this.db
            .findByIdAndRemove(id)
            .then(() => {
              res.json({
                msg: `${this.name} has been deleted successfully!`,
              });
            })
            .catch(() =>
              res.status(500).json({
                msg: "An error occurred, please try again later!",
              })
            );
        }
      });
    });
  }
}

module.exports = CommitteeService;
