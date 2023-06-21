const express = require("express");
const app = express();
const morgan = require("morgan");
const port = 8000;
const bodyParser = require("body-parser");

//Route import
const routeTodo = require("./routes/todo.route");
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.status(200).render("index");
});

app.use("/api/v1/todos", routeTodo);

app.listen(port, () => {
  console.log(`Link server: http://localhost:${port}`);
});
