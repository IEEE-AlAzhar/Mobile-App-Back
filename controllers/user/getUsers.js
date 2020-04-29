const getUser = (User) => (req, res) => {
  User.find({})
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
};

module.exports = getUser;
