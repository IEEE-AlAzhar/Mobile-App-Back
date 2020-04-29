const addAnnouncement = (Announcement) => (req, res) => {
  const { id, title, body, type, cover } = req.body;
  Announcement.create({
    id,
    title,
    body,
    type,
    cover,
  })
    .then((newAnnouncement) => res.json(newAnnouncement))
    .catch((err) => res.status(400).json(err));
};

module.exports = addAnnouncement;
