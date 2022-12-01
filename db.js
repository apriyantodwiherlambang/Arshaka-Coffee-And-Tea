const { Pool, Client } = require("pg");
require ("dotenv").config();
const Postgre = require('pg').Pool;

let connection;

if (process.env.ENV_MODE === "prod"){
connection = new Client({
  connectionString: process.env.DB_URI,
  ssl: {
    rejectUnauthorized: false,
  },
});
} else {
  connection = new Pool({
    user: process.env.host,
    host: process.env.user,
    database: process.env.database,
    password: process.env.password,
    port: process.env.db_port
  })
};

connection.connect(function (err) {
  if (err) throw err
  console.log('Connected!')
})

module.exports = connection
