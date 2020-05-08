const changeUserImage = (User) => (req, res) => {
  const { id } = req.params;
  const { image } = req.body;
  User.findOneAndUpdate({ _id: id }, { $set: { image: image } }, { new: true })
    .then((data) => {
      res.json({ image: data.image });
    })
    .catch((err) => {
      res.status(400).json({
        msg: "An error occurred, please try again later!",
        error: err,
      });
    });
};

module.exports = changeUserImage;
