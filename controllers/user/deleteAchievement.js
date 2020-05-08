const deleteAchievement = (Achievement) => (req, res) => {
  const { achievementId, id } = req.params;

  Achievement.findByIdAndRemove(achievementId)
    .then((data) => {
      User.findByIdAndUpdate(id, {
        $pull: { achievements: achievementId },
      }).then(() => {
        res.sendStatus(200);
      });
    })
    .catch((err) => {
      res.status(400).json({
        msg: "An error occurred",
        error: err,
      });
    });
};

module.exports = deleteAchievement;
