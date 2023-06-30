const express = require("express");
const route = express.Router();
const addAllBlogs = require("../controllers/blogsData.controller");

route.get("/", addAllBlogs);

module.exports = route;
