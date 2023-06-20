const express = require("express");
const path = require("path");
const fs = require("fs");
const userPath = path.join(__dirname, "../starer/data/users.json");
const { v4: uuidv4 } = require("uuid");
// console.log(2222222222, userPath);

const route = express.Router();

route.route("/").get((req, res) => {
  fs.readFile(userPath, (err, data) => {
    //     console.log(11111111, data);
    const users = JSON.parse(data);
    res.status(200).json(users);
  });
});

route
  .route("/:id")
  .get((req, res) => {
    const idUser = req.params.id;
    console.log(idUser);
    fs.readFile(userPath, (err, data) => {
      //     console.log(11111111, data);
      const users = JSON.parse(data);
      const getUser = users.find((user) => user._id == idUser);
      //     console.log(1111111111, getUser);
      res.status(200).json(getUser);
    });
  })
  .patch((req, res) => {
    fs.readFile(userPath, (err, data) => {
      //     console.log(11111111, data);
      const users = JSON.parse(data);

      const index = users.findIndex((user) => user._id === req.body._id);
      users[index] = { ...users[index], ...req.body };
      fs.writeFile(userPath, JSON.stringify(users), (err, data) => {
        if (err) {
          res.status(500).send("Error writing");
        }
      });
      res.status(200).json(users);
    });
  })
  .delete((req, res) => {
    fs.readFile(userPath, (err, data) => {
      console.log(22222222222222, req.body);
      const users = JSON.parse(data);

      const newUsers = users.filter((user) => user._id !== req.body._id);

      fs.writeFile(userPath, JSON.stringify(newUsers), (err, data) => {
        if (err) {
          res.status(500).send("Error writing");
        }
      });
      res.status(200).json(newUsers);
    });
  });

route.route("/create").post((req, res) => {
  const id = uuidv4();
  const active = true;
  const newUser = { ...req.body, _id: id, active: active };
  // console.log(newUser);
  fs.readFile(userPath, (err, data) => {
    const users = JSON.parse(data);
    const index = users.findIndex((user) => user.email === newUser.email);
    if (index === -1) {
      users.push(newUser);
    }
    fs.writeFile(userPath, JSON.stringify(users), (err, data) => {
      if (err) {
        res.status(500).send("Error writing");
      }
    });
    res.redirect("/api/v1/users");
  });
});

module.exports = route;
