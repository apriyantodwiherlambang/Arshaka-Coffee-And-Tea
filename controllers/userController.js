const model = require('../model/userModel')
const bcrypt = require('bcrypt')
const path = require('path')

const getUsers = async (req, res) => {
  try {
    const getData = await model.getAllUsers()

    res.send(
      {
        data: getData.rows,
        jumlahData: getData.rowCount
      }
    )
  } catch (error) {
    console.log('error', error)
    res.send(
      {
        result: {
          message: 'Something went wrong',
          code: 400
        }
      })
  }
}

const getUserId = async (req, res) => {
  try {
    const { id } = req.params
    const getData = await model.getUserById(id)

    if (getData.rowCount > 0) {
      if (parseInt(id)) {
        res.send(
          {
            data: getData.rows,
            jumlahData: getData.rowCount
          }
        )
      } else {
        res.status(400).send('Invalid number!')
      }
    } else {
      res.status(400).send('User id not found!')
    }
  } catch (error) {
    console.log('error', error)
    res.send(
      {
        result: {
          message: 'Something went wrong',
          code: 400
        }
      })
  }
}

const getUsersName = async (req, res) => {
  try {
    const { user_name } = req.params
    const getData = await model.getUserByName(user_name)

    res.send(
      {
        data: getData.rows,
        jumlahData: getData.rowCount
      })
  } catch (error) {
    res.send(
      {
        result: {
          message: 'Something went wrong',
          code: 400
        }
      })
  }
}

const getEmailUsers = async (req, res) => {
  try {
    const { email } = req.params
    const getData = await model.getUserByEmail(email)

    if (getData.rowCount > 0) {
      res.send(
        {
          data: getData.rows,
          jumlahData: getData.rowCount
        })
    } else {
      res.status(400).send('Email not found!')
    }
  } catch (error) {
    console.log('error', error)
    res.send(
      {
        result: {
          message: 'Something went wrong',
          code: 400
        }
      })
  }
}

const addUser = async (req, res) => {
  try {
    const { name, email, password, phone, confirm_password } = req.body
    const dataEmail = await model.getUserByEmail(email)

    const salt = bcrypt.genSaltSync(15) // generate random string
    const hash = bcrypt.hashSync(password, salt) // hash password

    if (dataEmail.rowCount > 0) {
      res.status(409).send('Error : Duplicate email!')
    } else {
      if (password !== confirm_password) {
        res.status(400).send('Error : Password must be same!')
      } else {
        const getDataUsers = await model.addUser({
          name,
          email,
          password: hash,
          phone
        })
        res.status(200).send('Success create user')
      }
    }
  } catch (error) {
    console.log('error', error)
    res.send(
      {
        result: {
          message: 'Something went wrong',
          code: 400
        }
      })
  }
}

const editUser = async (req, res) => {
  try {
    const { user_id } = req.params
    const { name, email, password, phone, user_photo } = req.body
    const dataEmail = await model.getUserByEmail(email)

    const salt = bcrypt.genSaltSync(15); // generate random string
    const hash = bcrypt.hashSync(password, salt); // hash password

    if (dataEmail.rowCount > 0) {
      res.status(409).send('duplicate email')
    } else {
      const getdata = await model.editUser({
        name,
        email,
        password,
        phone,
        user_photo: path
      })
      res.status(200).send(`Success edit user id ${user_id}`)
    }
  } catch (error) {
    console.log(error)
    res.send(
      {
        result: {
          message: 'Something went wrong',
          code: 400
        }
      })
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params

    // Check user by id
    const getData = await model.getUserById(id)

    if (getData.rowCount > 0) {
      const deleteUser = await model.deleteUser(id)

      if (deleteUser) {
        res.send(
          {
            result: {
              message: `Successfully deleted user : ${id}`,
              code: 200
            }
          })
      } else {
        res.status(400).send('User failed to delete!')
      }
    } else {
      res.status(400).send('User not found!')
    }
  } catch (error) {
    console.log(error)
    res.send(
      {
        result: {
          message: 'Something went wrong',
          code: 400
        }
      })
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
