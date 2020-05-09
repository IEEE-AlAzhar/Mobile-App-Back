const editAnnouncement = (Announcement) => (req, res) => {
  const { id } = req.params;
  const { title, body, cover, date, type } = req.body;

  Announcement.findByIdAndUpdate(
    id,
    { title, body, cover, date, type },
    { new: true }
  )
    .then((updatedAnnouncement) => {
      res.json(updatedAnnouncement);
    })
    .catch(() =>
      res.status(500).json({
        msg: "An error occurred, please try again later!",
      })
    );
};

module.exports = editAnnouncement;
