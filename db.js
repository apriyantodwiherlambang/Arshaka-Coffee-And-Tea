const Postgre = require("pg").Pool;

const connection = new Postgre({
  user: process.env.host,
  host: process.env.user,
  database: process.env.password,
  password: process.env.database,
  port: 5432,
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = connection;