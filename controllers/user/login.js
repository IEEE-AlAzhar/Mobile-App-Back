const login = (User) => (req, res) => {
  const { code } = req.body;
  User.findOne({ "user.code": code })
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({
          msg: "User does not exist!",
        });
      }
    })
    .catch((err) => res.status(400).json(err));
};

module.exports = login;
