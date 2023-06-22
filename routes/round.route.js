const express = require("express");
const route = express.Router();
const fs = require("fs");
const path = require("path");

route.route("/:id").get((req, res) => {
  const roundHtmlPath = path.join(__dirname, "../public/round.html");
  res.status(200).sendFile(roundHtmlPath);
});

module.exports = route;
