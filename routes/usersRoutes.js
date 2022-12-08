const Router = require('express').Router()
const controller = require('../controllers/userController')
const middleware = require('../middleware/verifyToken')
const userUpload = require('../middleware/upload')

Router.get('/', controller.getUsers) // GET ALL USERS
Router.get('/find/:id', controller.getUserId) // FIND USER BY ID
Router.get('/find/username/:user_name', controller.getUsersName) // FIND USER BY NAME
Router.get('/find/email/:email', controller.getEmailUsers) // FIND USER BY EMAIL

Router.post('/add', controller.addUser) // POST PROFILE
Router.patch('/edit/:user_id', userUpload.uploadUserPhoto, controller.editUser) // EDIT PROFILE
Router.delete('/delete/:id', controller.deleteUser) // DELETE PROFILE

module.exports = Router
