const db = require('../db')

const getAllRecipes = () => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM recipes ORDER BY recipe_id ASC',
      (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
      }
    )
  })
}

const getRecipeById = (recipe_id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM recipes WHERE recipe_id = $1', [recipe_id], (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

const getRecipeByName = (title) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM recipes WHERE title LIKE '%${title}%' `, (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

const getRecipeByUser = (id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM recipes WHERE user_id = $1 ', [id], (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

const getLatestRecipe = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM recipes ORDER BY created_at DESC LIMIT 5', (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}

const addRecipe = (props) => {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO recipes (recipe_id, title, ingredients, recipe_photo, recipe_videos, created_at, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [props.recipe_id, props.title, props.ingredients, props.recipe_photo, props.recipe_videos, props.created_at, props.user_id],
      (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
      }
    )
  })
}

const editRecipe = (props) => {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE recipes SET title = $1, ingredients = $2, recipe_photo = $3, recipe_videos = $4 WHERE recipe_id = $5',
      [props.title, props.ingredients, props.recipe_photo, props.recipe_videos, props.recipe_id],
      (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
      }
    )
  })
}

const deleteRecipe = (id) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM recipes WHERE recipe_id = $1', [id], (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

module.exports = {
  getAllRecipes,
  getRecipeById,
  getRecipeByName,
  getRecipeByUser,
  getLatestRecipe,
  addRecipe,
  editRecipe,
  deleteRecipe
}
