const changeUserImage = (User) => (req, res) => {
  console.log(req.params);
  const { _id } = req.params;
  const { image } = req.body;
  User.findOneAndUpdate({ _id }, { $set: { image: image } }, { new: true })
    .then((data) => {
      res.json({ image: data.image });
    })
    .catch((err) => {
      if (err.path === "_id") {
        res.status(404).json({
          msg: "User does not exist!",
        });
      }
      res.status(400).json({
        msg: "An error occurred, please try again later!",
        error: err,
      });
    });
};

module.exports = changeUserImage;
