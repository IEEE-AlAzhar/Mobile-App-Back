const addCommittee = (Committee) => (req, res) => {
  let { name } = req.body;
  Committee.create({ name })
    .then((newCommittee) => {
      res.json(newCommittee);
    })
    .catch(() =>
      res
        .status(500)
        .json({ msg: "An error occurred, please try again later!" })
    );
};

module.exports = addCommittee;
