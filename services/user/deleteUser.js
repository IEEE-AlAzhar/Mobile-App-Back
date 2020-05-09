const deleteUser = (User) => (req, res) => {
  const { _id } = req.params;

  User.findByIdAndDelete(_id)
    .then(() => {
      res.json("Success");
    })
    .catch((err) =>
      res.status(500).json({
        msg: "An error occurred, please try again later!",
        error: err,
      })
    );
};

module.exports = deleteUser;
