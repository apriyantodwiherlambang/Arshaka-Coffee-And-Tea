const model = require('../model/userModel');
const bcrypt = require("bcrypt");
const path = require("path");

const getUsers = async (req, res) => {
  try {
    const getData = await model.getAllUser()

    res.send({ data: getData.rows, jumlahData: getData.rowCount })
  } catch (error) {
    console.log('error', error)
    res.status(400).send('ada yang error')
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
        res.status(400).send('angka tidak valid')
      }
    } else 
      res.status(400).send('user id tidak di temukan')
  } catch (error) {
    console.log('error', error)
    res.status(400).send('ada yang error')
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
    res.status(400).send('ada yang error')
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
      res.status(400).send('email tidak di temukan')

  } catch (error) {
    console.log("error",error)
    res.status(400).send('ada yang error')
  }
}

const addUser = async (req, res) => {
  try {
    const { user_id, name, email, password, phone } = req.body
    const salt = bcrypt.genSaltSync(15); // generate random string
    const hash = bcrypt.hashSync(password, 10); // hash password
    console.log(req.file)
    const data = await model.getUserById(user_id);
    const dataEmail = await model.getByEmail(email)

    if ( data.rowCount > 0 ){
      res.status(409).send(`duplicate user`)
    } else if ( dataEmail.rowCount > 0) {
      res.status(409).send(`duplicate email`)
    } else {
      const getDataUsers = await model.addUser({ user_id, name, email, password : hash, phone, user_photo: req.file })
      res.status(200).send(`Success create user ${user_id}`)
    }
  } catch (error) {
    console.log('error', error)
    res.status(400).send('ada yang error')
  }
}

const editUser = async (req, res) => {
  try {
    const { user_id, name, email, password, phone, user_photo } = req.file
    const dataEmail = await model.getByEmail(email)

    const salt = bcrypt.genSaltSync(15); // generate random string
    const hash = bcrypt.hashSync(password, salt); // hash password

    if ( dataEmail.rowCount > 0) {
      res.status(409).send(`duplicate email`)
    } else {
      const getdata = await model.editUser({user_id, name, email, password: hash, phone, user_photo})
      res.status(200).send(`Success edit user id ${user_id}`)
    }
  } catch (error) {
    console.log(error)
    res.status(400).send('ada yang error')
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
        res.send(`data id ke ${user_id} berhasil di hapus`)
      } else {
        res.status(400).send('data gagal di hapus')
      }
    } else {
      res.status(400).send('data tidak di temukan')
    }
  } catch (error) {
    console.log(error)
    res.status(400).send('ada yang error')
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
