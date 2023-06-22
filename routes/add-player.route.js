const express = require("express");
const route = express.Router();
const fs = require("fs");
const path = require("path");

route.route("/").get((req, res) => {
  const playerHtmlPath = path.join(__dirname, "../public/add-player.html");
  res.status(200).sendFile(playerHtmlPath);
});

module.exports = route;
