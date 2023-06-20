const express = require("express");
const path = require("path");
const fs = require("fs");
const questionPath = path.join(
  __dirname,
  "../starer/data-question/questions.json"
);
const route = express.Router();
const middlewareQuestion = require("../middlewares/question");

//Dẫn đến file tổng
route
  .get("/", (req, res) => {
    fs.readFile(questionPath, (err, data) => {
      //     console.log(11111111, data);
      const questions = JSON.parse(data);
      res.status(200).json(questions);
    });
  })
  .post("/", middlewareQuestion.checkExitsContent, (req, res) => {
    const newQuestion = {
      content: req.body.content,
      like: Number(req.body.like),
      dislike: Number(req.body.dislike),
      id: Number(req.body.id),
    };
    //     console.log(newQuestion.content.toLowerCase());
    let message;
    fs.readFile(questionPath, (err, data) => {
      const questions = JSON.parse(data);
      //  const findQuestion = questions.find(
      //    (question) =>
      //      question.content.toLowerCase() === newQuestion.content.toLowerCase()
      //  );
      //  const index = questions.indexOf(
      //    (question) =>
      //      question.content.toLowerCase() === newQuestion.content.toLowerCase()
      //  );
      //  console.log(1111111111, findQuestion);

      questions.push(newQuestion);
      fs.writeFile(questionPath, JSON.stringify(questions), (err, data) => {
        console.log(err);
      });
      message = { message: "Create Question Successfully" };
      res.status(200).json(message);
    });
  });

//Dẫn đến ID
route
  .route("/:id")
  .get(middlewareQuestion.checkExitsId, (req, res) => {
    fs.readFile(questionPath, (err, data) => {
      const questions = JSON.parse(data);
      const findQuestion = questions.find(
        (question) => question.id === +req.params.id
      );
      res.status(200).json(findQuestion);
    });
  })
  .put(middlewareQuestion.checkExitsId, (req, res) => {
    // console.log("kết quả của data là:", req.body);
    fs.readFile(questionPath, (err, data) => {
      let questions = JSON.parse(data);
      const index = questions.findIndex(
        (question) => question.id == +req.params.id
      );
      req.body.like = Number(req.body.like);
      req.body.dislike = Number(req.body.dislike);
      //    console.log(111, index);
      questions[index] = { ...questions[index], ...req.body };
      fs.writeFile(questionPath, JSON.stringify(questions), (err) => {
        res.status(404).send("Error write question");
      });
    });
    res.status(200).json({ message: "Update is completed successfully" });
  })
  .delete(middlewareQuestion.checkExitsId, (req, res) => {
    fs.readFile(questionPath, (err, data) => {
      const questions = JSON.parse(data);

      const newQuestions = questions.filter(
        (question) => question.id != +req.params.id
      );
      fs.writeFile(questionPath, JSON.stringify(newQuestions), (err) => {
        res.status(404).send("Error write question");
      });
    });
    res.status(200).json({ message: "Delete is completed successfully" });
  });

module.exports = route;
