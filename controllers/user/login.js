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
    .catch((err) =>
      res.status(500).json("An error occurred, please try again later!")
    );
};

module.exports = login;
