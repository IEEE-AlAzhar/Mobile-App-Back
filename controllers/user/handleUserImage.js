const handleUserImage = (User) => (req, res) => {
  const { code } = req.params;
  const { image } = req.body;
  User.findOneAndUpdate(
    { "user.code": code },
    { $set: { "user.image": image } }
  )
    .then((data) => {
      if (data) {
        User.findOne({ "user.code": code }).then((data) => {
          res.json({image: data.user.image});
        });
      } else {
        res.status(404).json("User is not exist!");
      }
    })
    .catch((err) =>
      res.status(500).json("An error occurred, please try again later!")
    );
};

module.exports = handleUserImage;