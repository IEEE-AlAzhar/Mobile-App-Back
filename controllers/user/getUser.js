const getUser = (jwt, config) => (req, res) => {
  const { token } = req.headers;
  console.log("here: ", req.headers);
  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    }
    res.status(200).send(decoded);
  });
};

module.exports = getUser;
