const express = require("express");
const path = require("path");
const fs = require("fs");
const questionPath = path.join(
  __dirname,
  "../starer/data-question/questions.json"
);

function checkExitsId(req, res, next) {
  console.log("result của req", req.body);
  const id = req.params.id;
  fs.readFile(questionPath, (err, data) => {
    questions = JSON.parse(data);
    const index = questions.findIndex((question) => +question.id == +id);
    // console.log(index);
    if (index == -1) {
      res.status(404).send("Question not found");
      return;
    }
    next();
  });
}

function checkExitsContent(req, res, next) {
  const content = req.body.content;
  // console.log("content", content);
  fs.readFile(questionPath, (err, data) => {
    questions = JSON.parse(data);
    const findQuestion = questions.find(
      (question) => question?.content?.toLowerCase() == content?.toLowerCase()
    );
    if (findQuestion) {
      res.status(404).send("Question already exists");
      return;
    }
    next();
  });
}

module.exports = { checkExitsId, checkExitsContent };
