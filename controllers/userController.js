const model = require('../model/userModel');
const bcrypt = require("bcrypt");
const path = require("path");

const getUsers = async (req, res) => {
  try {
    const getData = await model.getAllUser()

    res.send({ data: getData.rows, jumlahData: getData.rowCount })
  } catch (error) {
    console.log('error', error)
    res.status(400).send(`Something's wrong`)
  }
}

const getUserId = async (req, res) => {
  try {
    const { user_id } = req.body
    const getData = await model.getUserById(user_id)

    if (getData.rowCount > 0) {
      if (parseInt(user_id)) {
        res.send({ data: getData.rows, jumlahData: getData.rowCount })
      } else {
        res.status(400).send('Invalid number!')
      }
    } else 
      res.status(400).send('User id not found!')
  } catch (error) {
    console.log('error', error)
    res.status(400).send(`Something's wrong`)
  }
}

const getUsersName = async (req, res) => {
  try {
    const { name } = req.body
    const getData = await model.getByName(name)

    res.send({
      data: getData.rows,
      jumlahData: getData.rowCount
    })
  } catch (error) {
    res.status(400).send(`Something's wrong`)
  }
}

const getEmailUsers = async (req, res) => {
  try {
    const { email } = req.body
    const getData = await model.getByEmail(email)

    if (getData.rowCount > 0) {
      res.send({
        data: getData.rows,
        jumlahData: getData.rowCount
      })
    } else 
      res.status(400).send('Email not found!')

  } catch (error) {
    console.log("error",error)
    res.status(400).send(`Something's wrong`)
  }
}

const addUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const dataEmail = await model.getByEmail(email)

    const salt = bcrypt.genSaltSync(15); // generate random string
    const hash = bcrypt.hashSync(password, salt); // hash password
     
    if ( dataEmail.rowCount > 0) {
      res.status(409).send(`Error : Duplicate email!`)
    } else {
      const getDataUsers = await model.addUser({ name, email, password: hash, phone })
      res.status(200).send(`Success create user`)
    }
  } catch (error) {
    console.log('error', error)
    res.status(400).send(`Something's wrong`)
  }
}

// const editUser = async (req, res) => {
//   try {
//     const { user_id, name, email, password, phone, } = req.body
//     const dataEmail = await model.getByEmail(email)

//     if ( dataEmail.rowCount > 0) {
//       res.status(409).send(`duplicate email`)
//     } else {
//       const getdata = await model.editUser({user_id, name, email, password, phone, user_photo: req.file.path})
//       res.status(200).send(`Success edit user id ${user_id}`)
//     }
//   } catch (error) {
//     console.log(error)
//     res.status(400).send('ada yang error')
//   }
// }  

const editUser = async (req, res) => {
  try {
    const { user_id, name, email, password, phone, user_photo } = req.body
    const dataEmail = await model.getByEmail(email)

    // const salt = bcrypt.genSaltSync(15); // generate random string
    // const hash = bcrypt.hashSync(password, salt); // hash password

    if ( dataEmail.rowCount > 0) {
      res.status(409).send(`duplicate email`)
    } else {
      const getdata = await model.editUser({user_id, name, email, password, phone, user_photo})
      res.status(200).send(`Success edit user id ${user_id}`)
    }
  } catch (error) {
    console.log(error)
    res.status(400).send('Something went wrong!')
  }
}

const deleteUser = async (req, res) => {
  try {
    const { user_id } = req.body

    // Check user by id
    const getData = await model.getUserById(user_id)

    if (getData.rowCount > 0) {
      const deleteUser = await model.deleteUser(user_id)

      if (deleteUser) {
        res.send(`Successfully deleted user : ${user_id}`)
      } else {
        res.status(400).send('User failed to delete!')
      }
    } else {
      res.status(400).send('User not found!')
    }
  } catch (error) {
    console.log(error)
    res.status(400).send('Something went wrong!')
  }
}

module.exports = {
  getUsers,
  getUserId,
  getUsersName,
  getEmailUsers,
  addUser,
  editUser,
  deleteUser
}