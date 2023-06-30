// import SQL
const sql = require("../db/db.connect");
// import file  user.json
const users = require("../../dev-data/users.json");

// Thêm dữ liệu vào cơ sở dữ liệu

const modelAddUsers = (res) => {
  console.log(typeof users);
  users.forEach((user) => {
    const address = user.address;
    const company = user.company;
    // Thêm dữ liệu vào bảng address
    sql.query(
      "INSERT INTO addresses (street, suite, city, zipcode) VALUES (?, ?, ?, ?)",
      [address.street, address.suite, address.city, address.zipcode],
      (err, result) => {
        if (err) {
          console.error("Lỗi thêm dữ liệu vào bảng address:", err);
          return;
        }
        const addressId = result.insertId;
        //    Thêm dữ liệu vào bảng geo
        sql.query(
          "INSERT INTO geos (lat, lng, address_id) VALUES (?, ?, ?)",
          [address.geo.lat, address.geo.lng, addressId],
          (err) => {
            if (err) {
              console.error("Lỗi thêm dữ liệu vào bảng geo:", err);
              return;
            }
          }
        );

        // Thêm dữ liệu vào bảng company
        sql.query(
          "INSERT INTO companies (name, catchPhrase, bs) VALUES (?, ?, ?)",
          [company.name, company.catchPhrase, company.bs],
          (err, result) => {
            if (err) {
              console.error("Lỗi thêm dữ liệu vào bảng company:", err);
              return;
            }

            const companyId = result.insertId;

            // Thêm dữ liệu vào bảng users
            sql.query(
              "INSERT INTO users (name, username, email, address_id, phone, website, company_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
              [
                user.name,
                user.username,
                user.email,
                addressId,
                user.phone,
                user.website,
                companyId,
              ],
              (err) => {
                if (err) {
                  console.error("Lỗi thêm dữ liệu vào bảng users:", err);
                  return;
                }
              }
            );
          }
        );
      }
    );
  });
  res.status(200).json(users);
};

module.exports = { modelAddUsers };
