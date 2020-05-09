const getAnnouncements = (Announcement) => (req, res) => {
  Announcement.find({})
    .then((announcements) => res.json(announcements))
    .catch(() =>
      res.status(500).json({
        msg: "An error occurred, please try again later!",
      })
    );
};

module.exports = getAnnouncements;
