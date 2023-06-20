const express = require("express");
const route = express.Router();
const path = require("path");

route.get("/:id", (req, res) => {
  const askFilePath = path.join(__dirname, "../public/question-detail.html");
  res.status(200).sendFile(askFilePath);
});

module.exports = route;
