const handleLogin = (User) => (req, res) => {
  const { code, name, phone, image, role, type, committee } = req.body.user;
  const { token } = req.body;
  User.create({
    token,
    user: {
      code,
      name,
      phone,
      image,
      role,
      type,
      committee,
    },
  })
    .then((newUser) => res.json(newUser))
    .catch((err) => res.status(400).json(err));
};

module.exports = handleLogin;