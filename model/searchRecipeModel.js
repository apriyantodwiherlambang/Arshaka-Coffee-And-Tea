const db = require("../db");

const getAllRecipe = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM recipes ORDER BY recipe_id ASC`,
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

const getByName = (title) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM recipes WHERE title = $1`, [title], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = { getAllRecipe, getByName };