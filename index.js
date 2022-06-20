const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require("body-parser");
const helmet = require("helmet");
const db = require("./db");

// request = input
// response = output
app.use(helmet());

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

let profile = [];

// GET USERS
app.get("/users", (req, res) => {
  db.query(
    `SELECT * FROM users`, (error, result) => {
      if (error) {
        res.status(400).send("ada yang error");
      } else {
        res.send({ data: result.rows, jumlahData: result.rowCount });
      }
    }
  );
});


// // FIND USERS
// app.get("/users/find", (req, res) => {
//   const { id } = req.body;
//   db.query(
//     `SELECT * FROM users WHERE id = $1`, [id], 
//     (error, result) => {
//     if (error) {
//       res.status(400).send("ada yang error");
//     } else {
//       res.send({ data: result.rows, jumlahData: result.rowCount });
//     }
//   });
// });

// POST PROFILE
app.post("/users/add", (req,res) => {
  const { id, name, email, password, phone, photo } = req.body;
  db.query(
    `INSERT INTO users (id, name, email, password, phone, photo) VALUES ($1, $2, $3, $4, $5)')`[id, name, email, password, phone, photo],
    (error,result) => {
      if (error) {
        console.log("error", error)
        res.status(400).send("ada yang error");
      } else {
        res.send("data berhasil ditambah");
      }
    }
  );
});

// end of bottom code
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});