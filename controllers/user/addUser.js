const addUser = (User, jwt, config) => (req, res) => {
  const { code, name, phone, image, role, type, committee } = req.body;
  User.create({
    code,
    name,
    phone,
    image,
    role,
    type,
    committee,
  })
    .then((newUser) => {
      const token = jwt.sign({ code: newUser.code }, config.secret, {
        expiresIn: 86400,
      });
      res.json({ auth: true, token: token });
    })
    .catch((err) => res.status(400).json(err));
};

module.exports = addUser;
