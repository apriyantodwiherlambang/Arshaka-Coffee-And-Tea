const Router = require('express').Router()
const controller = require('../controllers/commentController')

// GET ALL RECIPES
Router.get('/comments', controller.getComments)

// FIND COMMENT BY ID
Router.get('/comments/find/id', controller.getCommentId)

// FIND COMMENT BY RECIPE
Router.get('/comments/find/recipe', controller.getCommentRecipe)

// ADD COMMENT
Router.post('/comments/add', controller.addComment)

// EDIT COMMENT
Router.patch('/comments/edit', controller.editComment)

// DELETE COMMENT
Router.delete('/comments/delete', controller.deleteComment)

module.exports = Router
