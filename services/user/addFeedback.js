const addFeedback = (User, Feedback) => (req, res) => {
  const { id } = req.params;
  const { title, date, body } = req.body;

  Feedback.create({
    title,
    date,
    body,
  }).then((feedback) => {
    User.findByIdAndUpdate(
      id,
      { $push: { feedbacks: feedback._id } },
      { new: true }
    )
      .then((data) => {
        if (data) {
          res.json(feedback);
        } else {
          res.status(404).json({
            msg: "User does not exist!",
          });
        }
      })
      .catch(() =>
        res.status(500).json("An error occurred, please try again later!")
      );
  });
};

module.exports = addFeedback;
