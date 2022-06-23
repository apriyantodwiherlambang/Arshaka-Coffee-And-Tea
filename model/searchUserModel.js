const db = require("../db");

const getAllUser = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM users ORDER BY id ASC`,
      (error, result) => {
        if (error) {
            console.log("error",error)
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const getByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM users WHERE email = $1`,
      [email],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const getByName = (name) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM users WHERE name LIKE '%${name}%'`, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = { getAllUser, getByEmail, getByName };