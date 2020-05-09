const deleteAnnouncement = (Announcement) => (req, res) => {
  const { id } = req.params;

  Announcement.findByIdAndRemove(id)
    .then(() => {
      res.json({
        msg: "Announcement has been deleted successfully!",
      });
    })
    .catch(() =>
      res.status(500).json({
        msg: "An error occurred, please try again later!",
      })
    );
};

module.exports = deleteAnnouncement;
