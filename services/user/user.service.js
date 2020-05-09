const CoreService = require("../core.service.js");
const User = require("../../models/User.model");
const jwt = require("jsonwebtoken");
const config = require("../../config/token");

class UserService extends CoreService {
  constructor() {
    super();
    this.initialize(User, "User");
    this.getUserById = this.getUserById.bind(this);
    this.login = this.login.bind(this);
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
    this.db
      .findOne({ code: code })
      .then((user) => {
        if (user) {
          const token = jwt.sign({ id: user._id }, config.secret);

          res.json({ auth: true, token: token, userData: user });
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

  changeImage(req, res) {
    const { id } = req.params;
    const { image } = req.body;
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
