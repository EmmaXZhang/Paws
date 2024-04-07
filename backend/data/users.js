const bcrypt = require("bcryptjs");

const users = [
  {
    name: "Admin User",
    email: "admin@email.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "emma",
    email: "emma@email.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
  {
    name: "mic",
    email: "mic@email.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
];

module.exports = users;
