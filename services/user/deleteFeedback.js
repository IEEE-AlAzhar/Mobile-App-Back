const deleteFeedback = (Feedback) => (req, res) => {
  const { feedbackId, id } = req.params;

  Feedback.findByIdAndRemove(feedbackId)
    .then(() => {
      User.findByIdAndUpdate(id, {
        $pull: { feedbacks: feedbackId },
      }).then(() => {
        res.sendStatus(200);
      });
    })
    .catch((err) => {
      res.status(400).json({ msg: "An error occurred" });
    });
};

module.exports = deleteFeedback;
