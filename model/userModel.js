const db = require('../db')

const getAllUser = () => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM users ORDER BY user_id ASC',
      (error, result) => {
        if (error) {
          console.log('error', error)
          reject(error)
        } else {
          resolve(result)
        }
      }
    )
  })
}

const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE user_id = $1', [id], (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

const getByName = (name) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM users WHERE name LIKE '%${name}%'`, (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

const getByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM users WHERE email = $1`, [email], (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    }
    )
  })
}

const addUser = (props) => {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO users (user_id, name, email, password, phone, user_photo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [props.user_id, props.name, props.email, props.password, props.phone, props.user_photo],
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

const editUser = (props) => {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE users SET name = $1, email = $2, password = $3, phone = $4, user_photo = $5 WHERE user_id = $6',
      [props.name, props.email, props.password, props.phone, props.user_photo, props.user_id],
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

const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM users WHERE user_id = $1', [id], (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

module.exports = {
  getAllUser,
  getUserById,
  getByName,
  getByEmail,
  addUser,
  editUser,
  deleteUser
}
