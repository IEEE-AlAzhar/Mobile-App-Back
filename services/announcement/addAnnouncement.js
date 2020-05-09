const addAnnouncement = (Announcement) => (req, res) => {
  const { title, body, type, cover, date } = req.body;
  Announcement.create({
    title,
    body,
    type,
    cover,
    date,
  })
    .then((newAnnouncement) => res.json(newAnnouncement))
    .catch(() =>
      res.status(500).json({
        msg: "An error occurred, please try again later!",
      })
    );
};

module.exports = addAnnouncement;
