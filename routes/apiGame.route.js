const express = require("express");
const route = express.Router();
const fs = require("fs");
const path = require("path");

const apiGamePath = path.join(__dirname, "../dev-data/games.json");
route
  .route("/")
  .get((req, res) => {
    fs.readFile(apiGamePath, (err, data) => {
      const games = JSON.parse(data);
      res.status(200).json(games);
    });
  })
  .post((req, res) => {
    fs.readFile(apiGamePath, (err, data) => {
      games = JSON.parse(data);
      const newGame = {
        id: req.body.id,
        players: req.body.players,
        rounds: req.body.rounds,
      };
      games.push(newGame);
      fs.writeFile(apiGamePath, JSON.stringify(games), (err, data) => {
        if (err) {
          console.log(err);
          return;
        }
        response.status(200).json(games);
      });
    });
  });

//Tạo id cho route
route.route("/:id").put((req, res) => {
  const id = req.params.id;
  fs.readFile(apiGamePath, (err, data) => {
    const games = JSON.parse(data);
    const index = games.findIndex((item) => item.id === +id);
    games[index] = { ...games[index], ...req.body };
    fs.writeFile(apiGamePath, JSON.stringify(games), (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
    });
    res.status(200).json(games[index]);
  });
});

module.exports = route;
