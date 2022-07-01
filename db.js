const Postgre = require('pg').Pool

const connection = new Postgre({
  user: process.env.host,
  host: process.env.user,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port
})

connection.connect(function (err) {
  if (err) throw err
  console.log('Connected!')
})

module.exports = connection
