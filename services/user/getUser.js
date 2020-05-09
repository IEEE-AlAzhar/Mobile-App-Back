const getUser = (User) => (req, res) => {
  const { _id } = req.params;
  User.findById(_id)
    .populate("achievements")
    .populate("feedbacks")
    .then((newUser) => {
      res.json(newUser);
    })
    .catch(() => {
      res.status(500).json({ msg: "User not found" });
    });
};

module.exports = getUser;
