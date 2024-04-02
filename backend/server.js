/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require("express");
const path = require("path");
const logger = require("morgan");
require("dotenv").config();
require("./config/database");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, "dist")));

app.use(require("./config/checkToken"));

app.use("/api/users", require("./routes/api/users"));

//any URL/paths which is not exist, by sending the React index.html page (homepage)
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

//server side: after deployed, use process.env.PORT otherwise using server:3001
const port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log(`Express app running on http://localhost:${port}`);
});
