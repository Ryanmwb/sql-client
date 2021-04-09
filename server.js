require("dotenv").config();
const cors = require("cors");
const express = require("express");
const path = require("path");
const logger = require("morgan");

const apis = require("./apis");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/apis", apis, (error, req, res, done) => {
  console.log("ROUTE ERR", error);
  return res.sendStatus(500);
});
app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const PORT = process.env.PORT || 5000;
