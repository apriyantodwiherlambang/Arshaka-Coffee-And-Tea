const Postgre = require("pg").Pool;

const connection = new Postgre({
  user: "postgres",
  host: "localhost",
  database: "arshaka_resto",
  password: "buburkacangijo",
  port: 5432,
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = connection;