const changeUserPhone = (User) => (req, res) => {
  const { _id } = req.params;
  const { phone } = req.body;
  User.findOneAndUpdate({ _id }, { $set: { phone: phone } }, { new: true })
    .then((data) => {
      res.json({ phone: data.phone });
    })
    .catch((err) => {
      if (err.path === "_id") {
        res.status(404).json({
          msg: "User does not exist!",
        });
      }
      res.status(500).json({
        msg: "An error occurred, please try again later!",
        error: err,
      });
    });
};

module.exports = changeUserPhone;
