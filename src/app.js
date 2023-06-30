const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 8080;
const userRoute = require("./routes/user.route");
const dataBlogsRoute = require("./routes/datablogs.route");

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("Hello world!");
});

//route
app.use("/api/v1/users", userRoute);
app.use("/datablogs", dataBlogsRoute);

app.listen(port, () => {
  console.log(`Server Express http://localhost:${port}`);
});
