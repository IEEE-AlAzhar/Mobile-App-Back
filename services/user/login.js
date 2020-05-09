const login = (User, jwt, config) => (req, res) => {
  const { code } = req.body;
  User.findOne({ code: code })
    .then((user) => {
      if (user) {
        const token = jwt.sign({ id: user._id }, config.secret);

        res.json({ auth: true, token: token, userData: user });
      } else {
        res.status(404).json({ msg: "User does not exist!" });
      }
    })
    .catch((err) =>
      res.status(500).json({
        msg: "An error occurred, please try again later!",
        error: err,
      })
    );
};

module.exports = login;
