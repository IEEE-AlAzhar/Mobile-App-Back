const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

require("dotenv").config();

mongoose
  .connect(process.env.DB_URI, {
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

const userController = require("./controllers/users.controller");
app.use("/api/users", userController);

const announcementController = require("./controllers/announcements.controller");
app.use("/api/announcements", announcementController);

const committeeController = require("./controllers/committees.controller");
app.use("/api/committees", committeeController);

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
