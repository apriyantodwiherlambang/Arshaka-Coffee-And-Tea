const Router = require('express').Router()
const controller = require('../controllers/userController')
const middleware = require('../middleware/verifyToken');
const userUpload = require("../middleware/upload");

Router.get('/users', controller.getUsers) // GET ALL USERS
Router.get('/users/find/:id', controller.getUserId) // FIND USERS BY ID
Router.get('/users/find/name', controller.getUsersName) // FIND USERS BY NAME
Router.get('/users/find/email', controller.getEmailUsers) // FIND USERS BY EMAIL


Router.post('/users/add', controller.addUser) // POST PROFILE

Router.patch('/users/edit', middleware.checkToken, controller.editUser) // EDIT PROFILE
Router.delete('/users/delete', middleware.checkToken, controller.deleteUser) // DELETE PROFILE

module.exports = Router
