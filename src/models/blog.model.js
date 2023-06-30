// import SQL
const sql = require("../db/db.connect");
// import file  user.json
const blogs = require("../../dev-data/blogs.json");

const addAllBlogsFromFile = (res) => {
  blogs.forEach((blog) => {
    sql.query(
      "INSERT INTO blogs (userId, title, body) VALUES (?, ?, ?)",
      [blog.userId, blog.title, blog.body],
      (err) => {
        if (err) {
          console.error("Lỗi thêm dữ liệu vào bảng blogs:", err);
          return;
        }
      }
    );
  });
  res.status(200).json(blogs);
};

module.exports = addAllBlogsFromFile;
