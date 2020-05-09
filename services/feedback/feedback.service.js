const CoreService = require("../core.service.js");
const Feedback = require("../../models/Feedback.model");
const User = require("../../models/User.model");

class FeedbackService extends CoreService {
  constructor() {
    super();
    this.initialize(Feedback, "Feedback");
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
          { $push: { feedbacks: record._id } },
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
          .catch(() =>
            res.status(500).json("An error occurred, please try again later!")
          );
      });
  }

  deleteRecord(req, res) {
    const { feedbackId, id } = req.params;

    this.db
      .findByIdAndRemove(feedbackId)
      .then(() => {
        User.findByIdAndUpdate(id, {
          $pull: { feedbacks: feedbackId },
        }).then(() => {
          res.sendStatus(200);
        });
      })
      .catch((err) => {
        res.status(400).json({ msg: "An error occurred" });
      });
  }
}

module.exports = FeedbackService;
