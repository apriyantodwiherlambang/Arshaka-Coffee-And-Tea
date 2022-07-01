const db = require('../db')

const getAllComment = () => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM comments ORDER BY comment_id ASC',
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

const getCommentById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM comments WHERE comment_id = $1', [id],
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

const getCommentByRecipe = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM comments WHERE recipe_id = $1', [id],
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

const addComment = (props) => {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO comments (comment_id, comment, user_id, recipe_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [props.comment_id, props.comment, props.user_id, props.recipe_id],
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

const editComment = (props) => {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE comments SET comment = $1, user_id = $2, recipe_id = $3 WHERE comment_id = $4',
      [props.comment, props.user_id, props.recipe_id, props.comment_id],
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

const deleteComment = (id) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM comments WHERE comment_id = $1', [id], (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

module.exports = {
  getAllComment,
  getCommentById,
  getCommentByRecipe,
  addComment,
  editComment,
  deleteComment
}
