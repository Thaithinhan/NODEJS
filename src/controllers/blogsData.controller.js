const addAllBlogsFromFile = require("../models/blog.model");

const addAllBlogs = (req, res) => {
  // lấy model rồi truyền qua bên userRoute
  addAllBlogsFromFile(res);
};
module.exports = addAllBlogs;
