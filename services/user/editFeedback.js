const editFeedback = (Feedback) => (req, res) => {
  const { feedbackId } = req.params;
  let { title, date, body } = req.body;

  Feedback.findByIdAndUpdate(
    feedbackId,
    {
      title,
      date,
      body,
    },
    { new: true }
  )
    .then((feedback) => {
      res.json(feedback);
    })
    .catch(() => {
      res.json({ msg: "An error occurred" });
    });
};

module.exports = editFeedback;
