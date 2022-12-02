const Router = require('express').Router()
const controller = require('../controllers/recipeController')

Router.get('/', controller.getRecipes) // GET ALL RECIPES
Router.get('/find/:recipe_id', controller.getRecipeId) // FIND RECIPE BY ID
Router.get('/find/:title', controller.getRecipeName) // FIND RECIPE BY NAME
Router.get('/find/user_id', controller.getRecipeUser) // FIND RECIPE BY USER
Router.get('/latestrecipes', controller.getLatestRecipes) // GET RECIPE MAX 5

Router.post('/add', controller.addRecipe) // POST RECIPE
Router.patch('/edit', controller.editRecipe) // EDIT RECIPE
Router.delete('/delete/:recipe_id', controller.deleteRecipe) // DELETE RECIPE

module.exports = Router
