/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require("express");
const path = require("path");
const logger = require("morgan");
require("dotenv").config();
require("./config/database");
const cookieParser = require("cookie-parser");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(express.static(path.join(__dirname, "dist")));
app.use(cookieParser());

app.use("/api/users", require("./routes/api/users"));

app.use("/api/products", require("./routes/api/products"));

app.use("/api/orders", require("./routes/api/orders"));

app.use("/api/images", require("./routes/api/images"));

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html")));
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

//server side: after deployed, use process.env.PORT otherwise using server:3001
const port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log(`Express app running on http://localhost:${port}`);
});
