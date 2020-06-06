const CoreService = require("../core.service.js");
const User = require("../../models/User.model");
const jwt = require("jsonwebtoken");

class UserService extends CoreService {
  constructor() {
    super();
    this.initialize(User, "User");
    this.login = this.login.bind(this);
    this.listRecords = this.listRecords.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.changeImage = this.changeImage.bind(this);
    this.changePhone = this.changePhone.bind(this);
  }

  getUserById(req, res) {
    const { id } = req.params;
    this.db
      .findById(id)
      .populate("achievements")
      .populate("feedbacks")
      .then((newUser) => {
        res.json(newUser);
      })
      .catch(() => {
        res.status(404).json({ msg: `${this.name} not found` });
      });
  }

  login(req, res) {
    const { code } = req.body;
    if (req.device.type === "phone") {
      this.db
        .findOne(
          { code: code },
          "name phone email image role committee feedbacks achievements"
        )
        .populate("achievements")
        .populate("feedbacks")
        .then((user) => {
          if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_PASSWORD, {
              expiresIn: 2592000, // 1 month
            });

            res.json({ auth: true, token: token, user });
          } else {
            res.status(404).json({ msg: `${this.name} does not exist!` });
          }
        })
        .catch((err) =>
          res.status(500).json({
            msg: "An error occurred, please try again later!",
            error: err,
          })
        );
    } else {
      this.db
        .findOne({ code: code })
        .then((user) => {
          if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_PASSWORD, {
              expiresIn: 2592000, // 1 month
            });

            res.json({ auth: true, token: token, user });
          } else {
            res.status(404).json({ msg: `${this.name} does not exist!` });
          }
        })
        .catch((err) =>
          res.status(500).json({
            msg: "An error occurred, please try again later!",
            error: err,
          })
        );
    }
  }

  logout(req, res) {
    req.user = null;
    res.json({ success: true });
  }

  listRecords(req, res) {
    let { type, committee } = req.user;
    if (type === "Admin") {
      this.db
        .find({})
        .then((records) => res.json(records))
        .catch(() =>
          res.status(500).json({
            msg: "An error occurred, please try again later!",
          })
        );
    } else {
      this.db
        .find({ committee })
        .then((records) => res.json(records))
        .catch(() =>
          res.status(500).json({
            msg: "An error occurred, please try again later!",
          })
        );
    }
  }

  changeImage(req, res) {
    const { id } = req.params;
    let image = req.file.secure_url;

    this.db
      .findByIdAndUpdate(id, { $set: { image } }, { new: true })
      .then((data) => {
        res.json({ image: data.image });
      })
      .catch((err) => {
        if (err.path === "_id") {
          res.status(404).json({
            msg: `${this.name} does not exist!`,
          });
        }
        res.status(400).json({
          msg: "An error occurred, please try again later!",
          error: err,
        });
      });
  }

  changePhone(req, res) {
    const { id } = req.params;
    const { phone } = req.body;
    this.db
      .findByIdAndUpdate(id, { $set: { phone } }, { new: true })
      .then((data) => {
        res.json({ phone: data.phone });
      })
      .catch((err) => {
        if (err.path === "_id") {
          res.status(404).json({
            msg: `${this.name} does not exist!`,
          });
        }
        res.status(500).json({
          msg: "An error occurred, please try again later!",
          error: err,
        });
      });
  }
}

module.exports = UserService;
