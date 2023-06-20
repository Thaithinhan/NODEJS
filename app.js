const express = require("express");
const app = express();
const port = 3000;
const routeUser = require("./routes/user.route");
const routeQuestion = require("./routes/question.route");
const routeAsk = require("./routes/ask.route");
const routeQuestionDetail = require("./routes/question-detail.route");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
// const userPath = path.join(__dirname, "./starer/data/users.json");
const morgan = require("morgan");
const { v4: uuidv4 } = require("uuid");

//Middleware Global
app.use(express.static("views")); //Đọc file tĩnh user
app.use(express.static("public")); //Đọc file tĩnh user
app.use(express.urlencoded({ extended: true })); // Đặt trước middleware xử lý POST
app.use(morgan("combined"));
app.use(bodyParser.json());
// app.use(logger);

//Middleware ở vị trí route
app.get("/", logger, (req, res) => {
  res.status(200).sendFile("index.html");
});
// app.get("/overview", (req, res) => {
//   res.status(200).send("This is Overview page");
// });
// app.get("/product", logger, (req, res) => {
//   res.status(200).send("This is Product page");
// });

// app.get("/postUser", (req, res) => {
//   res.status(200).sendFile("postUser.html", { root: "./views" });
// });

app.use("/api/v1/users", routeUser);
app.use("/api/v1/questions", routeQuestion);
app.use("/ask", routeAsk);
app.use("/question-detail", routeQuestionDetail);

//hàm middel ware tự build
function logger(req, res, next) {
  //thực hiện tác vụ gì==> hiển thị ra param url khi ngươi dùng request
  console.log(
    `Người dùng truy cập vào điểm endpoint có params là url là ${req.url}`
  );
  next();
}

app.get("/*", (req, res) => {
  res.status(200).send("Page Not Found");
});

app.listen(port, () => {
  console.log(`running at http://localhost:${port}`);
});
