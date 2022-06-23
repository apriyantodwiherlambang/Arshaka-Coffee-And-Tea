const db = require("../db");

const getRecipeById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM recipes WHERE recipe_id = $1`, [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const getRecipeByName = (title) => {
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

const addRecipe = (props) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO recipes (recipe_id, title, ingredients, photo_recipe, video_recipe) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [props.recipe_id, props.title, props.ingredients, props.photo_recipe, props.video_recipe],
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

const editRecipe = (props) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE recipes SET title = $1, ingredients = $2, photo_recipe = $3, video_recipe = $4 WHERE recipe_id = $5`,
      [props.title, props.ingredients, props.photo_recipe, props.video_recipe, props.recipe_id],
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

const deleteRecipe = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM recipes WHERE recipe_id = $1`, [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
          resolve(result)
      }
    });
  });
};

module.exports = {
  getRecipeById,
  getRecipeByName,
  addRecipe,
  editRecipe,
  deleteRecipe,
};