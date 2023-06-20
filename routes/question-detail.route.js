const express = require("express");
const route = express.Router();
const path = require("path");
const middlewareQuestion = require("../middlewares/question");
const fs = require("fs");

route.get("/:id", middlewareQuestion.checkExitsId, (req, res) => {
  const id = req.params.id;
  const askFilePath = path.join(__dirname, "../public/question-detail.html");
  res.status(200).sendFile(askFilePath);
});

module.exports = route;
