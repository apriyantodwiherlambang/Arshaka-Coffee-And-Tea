const Router = require('express').Router()
const controller = require('../controllers/recipeController')

// FIND RECIPE
Router.get('/recipes/find/id', controller.getRecipeId)

// POST RECIPE
Router.post('/recipes/add', controller.addRecipe)

// EDIT RECIPE
Router.patch('/recipes/edit', controller.editRecipe)

// DELETE RECIPE
Router.delete('/recipes/delete', controller.deleteRecipe)

// GET RECIPES

// GET ALL RECIPES
Router.get('/recipes', controller.getRecipes)

// FIND RECIPE BY NAME
Router.get('/recipes/find/name', controller.getRecipeName)

// FIND RECIPE BY USER
Router.get('/recipes/find/user', controller.getRecipeUser)

// GET RECIPE MAX 5
Router.get('/recipes/latestrecipes', controller.getLatestRecipes)

module.exports = Router
