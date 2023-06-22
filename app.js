const express = require("express");
const app = express();
const morgan = require("morgan");
const port = 5000;
const bodyParser = require("body-parser");
const addPlayerRoute = require("./routes/add-player.route");
const roundRoute = require("./routes/round.route");
const apiGameRoute = require("./routes/apiGame.route");

app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.status(200).send("Trang chủ");
});

//Route Add Player
app.use("/addPlayer", addPlayerRoute);
app.use("/round", roundRoute);
app.use("/api/game", apiGameRoute);

app.listen(port, () => {
  console.log(`Link server: http://localhost:${port}`);
});
