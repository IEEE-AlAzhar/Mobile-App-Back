const editAchievement = (Achievement) => (req, res) => {
  const { achievementId } = req.params;
  const { title, date, description, cover } = req.body;

  Achievement.findByIdAndUpdate(
    achievementId,
    { title, date, description, cover },
    { new: true }
  )
    .then((achievement) => {
      res.json(achievement);
    })
    .catch(() => {
      res.json({ msg: "An error occurred" });
    });
};

module.exports = editAchievement;
