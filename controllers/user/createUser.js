const createUser = (User) => (req, res) => {
  const { code, name, email, phone, image, role, type, committee } = req.body;

  User.findOne({ code }).then((user) => {
    if (user) {
      res.status(400).json({ msg: "User already exists!" });
    } else {
      User.create({
        code,
        name,
        email,
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
        .catch((err) =>
          res
            .status(500)
            .json({ msg: "An error occurred, please try again later!" })
        );
    }
  });
};

module.exports = createUser;
