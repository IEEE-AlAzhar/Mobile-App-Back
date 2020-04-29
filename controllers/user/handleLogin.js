const handleLogin = (User) => (req, res) => {
  const { code } = req.body;
  User.findOne({ code })
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json("User is not exist!");
      }
    })
    .catch((err) => res.status(400).json(err));
};

module.exports = handleLogin;