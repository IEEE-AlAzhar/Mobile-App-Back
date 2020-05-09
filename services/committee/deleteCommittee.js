const deleteCommittee = (Committee) => (req, res) => {
  const { id } = req.params;

  Committee.findByIdAndRemove(id)
    .then(() => {
      res.json({
        msg: "Committee has been deleted successfully!",
      });
    })
    .catch(() =>
      res.status(500).json({
        msg: "An error occurred, please try again later!",
      })
    );
};

module.exports = deleteCommittee;
