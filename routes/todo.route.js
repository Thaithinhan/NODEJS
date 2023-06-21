const { error } = require("console");
const express = require("express");
const route = express.Router();
const fs = require("fs");
const path = require("path");
const checkExists = require("../middleware/checkExist");

const todoPath = path.join(__dirname, "../dev-data/todos.json");

//Link no have ID
route
  .route("/")
  .get((req, res) => {
    fs.readFile(todoPath, (err, data) => {
      if (!err) {
        const listTodo = JSON.parse(data);
        res.status(200).json(listTodo);
      }
    });
  })
  .post(checkExists.checkTitle, (req, res) => {
    // console.log(1111111111, req.body);
    const title = req.body.title;
    req.body.id = Number(req.body.id);
    req.body.userId = Number(req.body.userId);
    req.body.completed = false;

    fs.readFile(todoPath, (err, data) => {
      const listTodo = JSON.parse(data);
      // const findIndex = listTodo.findIndex(
      //   (todo) => todo.title.toLowerCase() === title.toLowerCase()
      // );
      listTodo.unshift(req.body);
      fs.writeFile(todoPath, JSON.stringify(listTodo), (err, data) => {
        if (err) {
          console.log(err);
        }
      });
      res.status(200).json(listTodo);
      // if (findIndex == -1) {
      //   listTodo.push(req.body);
      //   fs.writeFile(todoPath, JSON.stringify(listTodo), (err, data) => {
      //     if (err) {
      //       console.log(err);
      //     }
      //   });
      //   res.status(200).json(req.body);
      // } else {
      //   res.status(500).json({ message: "Todo already exists" });
      // }
    });
  });

route
  .route("/:id")
  .get(checkExists.checkId, (req, res) => {
    const id = req.params.id;
    fs.readFile(todoPath, (err, data) => {
      const questions = JSON.parse(data);
      const findIndex = questions.findIndex((question) => question.id === +id);
      // console.log(findIndex);
      // if (findIndex == -1) {
      //   res.status(500).send("Todo not found");
      //   return;
      // }
      res.status(200).json(questions[findIndex]);
    });
  })
  .put(checkExists.checkId, (req, res) => {
    const id = req.params.id;
    // req.body.id = Number(id);
    req.body.userId = Number(req.body.userId);
    req.body.completed = Boolean(req.body.completed);
    fs.readFile(todoPath, (err, data) => {
      const questions = JSON.parse(data);
      const findIndex = questions.findIndex((question) => question.id === +id);
      // console.log(findIndex);
      // if (findIndex == -1) {
      //   res.status(500).send("Todo not found");
      //   return;
      // }
      questions[findIndex] = { ...questions[findIndex], ...req.body };
      fs.writeFile(todoPath, JSON.stringify(questions), (err, data) => {
        console.log(err);
      });
      res.status(200).json(questions[findIndex]);
    });
  })
  .delete(checkExists.checkId, (req, res) => {
    const id = req.params.id;
    fs.readFile(todoPath, (err, data) => {
      const questions = JSON.parse(data);
      const findIndex = questions.findIndex((question) => question.id === +id);
      // console.log(findIndex);
      // if (findIndex == -1) {
      //   res.status(500).send("Todo not found");
      //   return;
      // }
      const newQuestions = questions.filter((question) => question.id !== +id);
      fs.writeFile(todoPath, JSON.stringify(newQuestions), (err, data) => {
        console.log(err);
      });
      res.status(200).json(newQuestions);
    });
  });

module.exports = route;
