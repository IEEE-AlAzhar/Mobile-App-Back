const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// require Models
const User = require("./models/User.model");

// require controllers
const getUsers = require("./controllers/user/getUsers");
const addUser = require("./controllers/user/addUser");
const handleLogin = require("./controllers/user/handleLogin");
// const getUser = require("./controllers/user/getUser");
// const handleUserImage = require("./controllers/user/handleUserImage");
// const handleUserPhone = require("./controllers/user/handleUserPhone");

require("dotenv").config();

mongoose
  .connect('mongodb://localhost:27017/mobApp' || process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

//Middlewares
app.use(express.json());
app.use(cors());

// end-points
app.get("/", (req, res) => res.json("root is working!"));
app.get("/users", getUsers(User));
app.post("/users/add", addUser(User));
app.post("/users/login", handleLogin(User));
// app.get("/user/:id", getUser(User));
// app.put("/user/:id/image", handleUserImage(User));
// app.put("/user/:id/phone", handleUserPhone(User));
app.delete("/reset", (req, res) =>
  User.deleteMany({}).then(res.json("Success"))
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "public")));

  // always send the index.html file to handle SPA routing
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
  });
}

// disable the X-Powered-By header instead of using helmet
app.disable("x-powered-by");

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening to port ${port}`));
