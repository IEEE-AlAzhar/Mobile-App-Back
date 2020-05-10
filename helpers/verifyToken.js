const jwt = require("jsonwebtoken");
const config = require("../config/token");

const User = require("../models/User.model");

const verifyToken = () => (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.status(403).json({ auth: false, message: "No token provided." });

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err)
      return res
        .status(500)
        .json({ auth: false, message: "Failed to authenticate token." });

    // To use the user data in other places
    User.findById(decoded.id).then((user) => {
      req.user = user;
      next();
    });
  });
};

module.exports = verifyToken;
