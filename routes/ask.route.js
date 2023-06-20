const express = require("express");
const route = express.Router();
const path = require("path");

route.get("/", (req, res) => {
  const askFilePath = path.join(__dirname, "../public/ask.html");
  res.status(200).sendFile(askFilePath);
});

module.exports = route;
