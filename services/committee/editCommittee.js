const editCommittee = (Committee) => (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  Committee.findByIdAndUpdate(id, { name }, { new: true })
    .then((updatedCommittee) => {
      res.json(updatedCommittee);
    })
    .catch(() =>
      res
        .status(500)
        .json({ msg: "An error occurred, please try again later!" })
    );
};

module.exports = editCommittee;
