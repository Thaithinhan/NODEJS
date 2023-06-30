//Import Modal

const userModel = require("../models/user.model");

const addAllUserFromFIle = (req, res) => {
  // lấy model rồi truyền qua bên userRoute
  userModel.modelAddUsers(res);
};

module.exports = { addAllUserFromFIle };
