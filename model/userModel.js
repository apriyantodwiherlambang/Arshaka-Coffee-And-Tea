const db = require("./db");

const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM users WHERE id = $1`, [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const addUser = (props) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO users (id, name, email, password, phone, photo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [props.id, props.name, props.email, props.password, props.phone, props.photo],
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

const addDetailUser = (props) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO detail (id, name, email, password, phone, photo) VALUES ($1, $2, $3, $4, $5, $6)`,
      [props.id, props.name, props.email, props.password, props.phone, props.photo],
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

const editUser = (props) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE users SET name = $1, email = $2, password = $3, photo = $4, phone = $5 WHERE id = $6`,
      [props.name, props.email, props.password, props.phone, props.photo, props.id],
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

const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM users WHERE id = $1`, [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        deleteDetailUser(id)
          .then(() => resolve(result))
          .catch((_error) => reject(_error));
      }
    });
  });
};

const deleteDetailUser = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM detail WHERE id = $1`, [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  getUserById,
  addUser,
  addDetailUser,
  editUser,
  deleteUser,
  deleteDetailUser,
};