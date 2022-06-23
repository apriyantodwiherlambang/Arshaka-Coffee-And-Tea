const Router = require("express").Router();
const db = require("../db");
const controller = require("../controllers/recipeController");

// FIND RECIPE
Router.get("/recipes/find/id", controller.getRecipeId);

// POST RECIPE
Router.post("/recipes/add", controller.addRecipe);

// EDIT RECIPE
Router.patch("/recipes/edit", controller.editRecipe);

// DELETE RECIPE
Router.delete("/recipes/delete", controller.deleteRecipe);

module.exports = Router;