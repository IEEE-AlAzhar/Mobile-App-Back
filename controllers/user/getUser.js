const getUser = (User) => (req, res) => {
  User.findById(req.userId, (err, user) => {
    if (err)
      return res.status(500).json("There was a problem finding the user.");
    if (!user) return res.status(404).json("No user found.");

    res.status(200).json(user);
  });
};

module.exports = getUser;
