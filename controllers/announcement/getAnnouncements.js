const getAnnouncements = (Announcements) => (req, res) => {
    Announcements.find({})
    .then((announcements) => res.json(announcements))
    .catch((err) =>
      res.status(500).json({
        msg: "An error occurred, please try again later!",
        err: err
      })
    );
};

module.exports = getAnnouncements;
