const getUser = (User) => (req, res) => {
  User.find({})
    .then((users) => res.json(users))
    .catch((err) =>
      res.status(500).json({
        msg: "An error occurred, please try again later!",
      })
    );
};

module.exports = getUser;
