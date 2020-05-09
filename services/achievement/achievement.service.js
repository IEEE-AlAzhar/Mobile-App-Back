const CoreService = require("../core.service.js");
const Achievement = require("../../models/Achievement.model");
const User = require("../../models/User.model");

class AchievementService extends CoreService {
  constructor() {
    super();
    this.initialize(Achievement, "Achievement");
    this.createRecord = this.createRecord.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
  }

  createRecord(req, res) {
    const { id } = req.params;

    this.db
      .create({
        ...req.body,
      })
      .then((record) => {
        User.findByIdAndUpdate(
          id,
          { $push: { achievements: record._id } },
          { new: true }
        )
          .then((data) => {
            if (data) {
              res.json(record);
            } else {
              res.status(404).json({
                msg: "User does not exist!",
              });
            }
          })
          .catch((err) =>
            res.status(500).json("An error occurred, please try again later!")
          );
      });
  }

  deleteRecord(req, res) {
    const { achievementId, id } = req.params;

    this.db
      .findByIdAndRemove(achievementId)
      .then((data) => {
        User.findByIdAndUpdate(id, {
          $pull: { achievements: achievementId },
        }).then(() => {
          res.sendStatus(200);
        });
      })
      .catch((err) => {
        res.status(400).json({
          msg: "An error occurred",
          error: err,
        });
      });
  }
}

module.exports = AchievementService;
