const addAchievement = (User, Achievement) => (req, res) => {
  const { id } = req.params;
  const { title, date, description, cover } = req.body;

  Achievement.create({
    title,
    date,
    description,
    cover,
  }).then((achievement) => {
    User.findByIdAndUpdate(
      id,
      { $push: { achievements: achievement._id } },
      { new: true }
    )
      .then((data) => {
        if (data) {
          res.json(achievement);
        } else {
          res.status(404).json({
            msg: "User does not exist!",
          });
        }
      })
      .catch((err) =>
        res.status(500).json("An error occurred, please try again later!")
      );
  });
};

module.exports = addAchievement;
