const db = require('../db')

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users ORDER BY user_id ASC', (error, result) => {
      if (error) {
        console.log('error', error)
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM users WHERE user_id = $1',
      [id],
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

const getUserByName = (name) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM users WHERE name = $1',
      [name],
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

const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM users WHERE email = $1',
      [email],
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

const addUser = (props) => {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO users (name, email, password, phone) VALUES ($1, $2, $3, $4) RETURNING *',
      [props.name, props.email, props.password, props.phone],
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
      [
        props.name,
        props.email,
        props.password,
        props.phone,
        props.user_photo,
        props.user_id
      ],
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
  getAllUsers,
  getUserById,
  getUserByName,
  getUserByEmail,
  addUser,
  editUser,
  deleteUser
}
