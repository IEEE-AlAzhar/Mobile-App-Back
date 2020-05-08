const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const jwt = require("jsonwebtoken");

const app = express();

// require Models
const User = require("./models/User.model");
const Announcement = require("./models/Announcement.model");

// require controllers
const verifyToken = require("./controllers/verifyToken");
const getUsers = require("./controllers/user/getUsers");
const getUser = require("./controllers/user/getUser");
const createUser = require("./controllers/user/createUser");
const login = require("./controllers/user/login");
const changeUserImage = require("./controllers/user/changeUserImage");
const changeUserPhone = require("./controllers/user/changeUserPhone");
const addAnnouncement = require("./controllers/announcement/addAnnouncement");
const getAnnouncements = require("./controllers/announcement/getAnnouncements");

require("dotenv").config();
const config = require("./config");

mongoose
  .connect("mongodb://localhost:27017/mobApp" || process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

//Middlewares
app.use(express.json());
app.use(cors());

// end-points
app.get("/", (req, res) => res.json("root is working!"));
app.get("/users", getUsers(User));
app.get("/user", verifyToken(jwt, config), getUser(User));
app.post("/users/create", createUser(User));
app.post("/user/login", login(User, jwt, config));
app.put("/user/:_id/image", verifyToken(jwt, config), changeUserImage(User));
app.put("/user/:_id/phone", verifyToken(jwt, config), changeUserPhone(User));
app.post("/announcements/add", addAnnouncement(Announcement));
app.get("/announcements", getAnnouncements(Announcement));
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
