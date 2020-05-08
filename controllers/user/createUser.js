const createUser = (User) => (req, res) => {
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
      res.json({
        msg: "User has been added successfully!",
        userData: newUser,
      });
    })
    .catch((err) => res.status(400).json(err.errmsg));
};

module.exports = createUser;
