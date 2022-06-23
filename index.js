const express = require("express");
require('dotenv').config();
const app = express();
const bodyParser = require("body-parser");
const helmet = require("helmet");
const port = 8000;

const userRoutes = require("./routes/searchUsersRoutes.js");
const userDetailRoutes = require("./routes/usersRoutes");
const recipeRoutes = require("./routes/searchRecipesRoutes.js");
const recipeDetailRoutes = require("./routes/recipesRoutes");

// request = input
// response = output
app.use(helmet());

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Define all routes
app.use("/", userRoutes);
app.use("/", userDetailRoutes);

// Define all recipes
app.use("/", recipeRoutes);
app.use("/", recipeDetailRoutes);

// end of bottom code
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});