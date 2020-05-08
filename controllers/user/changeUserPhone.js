const changeUserPhone = (User) => (req, res) => {
  const { id } = req.params;
  const { phone } = req.body;
  User.findOneAndUpdate({ _id: id }, { $set: { phone: phone } }, { new: true })
    .then((data) => {
      res.json({ phone: data.phone });
    })
    .catch((err) => {
      res.status(400).json({
        msg: "An error occurred, please try again later!",
        error: err,
      });
    });
};

module.exports = changeUserPhone;
