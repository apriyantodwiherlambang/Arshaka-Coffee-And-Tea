const Router = require("express").Router();
const db = require("../db");
const controller = require("../controllers/searchRecipeController");

// GET RECIPES

// AFTER
Router.get("/recipes", controller.getRecipes);

// FIND RECIPE BY NAME
Router.get("/recipes/find/name", controller.findNameRecipes);

module.exports = Router;