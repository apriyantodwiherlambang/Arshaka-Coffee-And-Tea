const Router = require('express').Router()
const controller = require('../controllers/commentController')

Router.get('/', controller.getComments) // GET ALL COMMENTS
Router.get('/find/:comment_id', controller.getCommentId) // FIND COMMENT BY ID
Router.get('/find/recipe', controller.getCommentRecipe) // FIND COMMENT BY RECIPE

Router.post('/add', controller.addComment) // ADD COMMENT
Router.patch('/edit', controller.editComment) // EDIT COMMENT
Router.delete('/delete/:comment_id', controller.deleteComment) // DELETE COMMENT

module.exports = Router
