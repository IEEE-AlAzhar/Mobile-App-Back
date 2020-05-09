const getCommittees = (Committee) => (req, res) => {
  Committee.find({})
    .then((committees) => {
      res.json(committees);
    })
    .catch(() =>
      res
        .status(500)
        .json({ msg: "An error occurred, please try again later!" })
    );
};

module.exports = getCommittees;
