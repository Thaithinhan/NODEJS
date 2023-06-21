const express = require("express");
const path = require("path");
const fs = require("fs");
const todoPath = path.join(__dirname, "../dev-data/todos.json");

function checkId(req, res, next) {
  const id = req.params.id;
  fs.readFile(todoPath, (err, data) => {
    fs.readFile(todoPath, (err, data) => {
      const questions = JSON.parse(data);
      const findIndex = questions.findIndex((question) => question.id === +id);
      // console.log(findIndex);
      if (findIndex == -1) {
        res.status(500).send("Todo not found");
        return;
      }
      next();
    });
  });
}

function checkTitle(req, res, next) {
  //   console.log(2222222222, req.body);const
  const id = req.body.id;
  const title = req.body.title;
  fs.readFile(todoPath, (err, data) => {
    const listTodo = JSON.parse(data);
    const findIndex = listTodo.findIndex(
      (todo) =>
        todo.title.toLowerCase() === title.toLowerCase() || todo.id === +id
    );
    if (findIndex !== -1) {
      res.status(500).json({ message: "Todo already exists" });
      return;
    }
    next();
  });
}

module.exports = { checkId, checkTitle };
