const express = require('express')
require('dotenv').config()

const app = express()
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')
const port = 8000

const userRoutes = require('./routes/usersRoutes')
const recipeRoutes = require('./routes/recipesRoutes')
const commentRoutes = require('./routes/commentsRoutes')
const authRoutes = require("./routes/authRoutes");

app.use(helmet())
app.use(cors())

app.use(bodyParser.json()) // parse application/json
app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded

// use cors for all
var allowlist = ["https://www.bca.co.id", "https://blubybcadigital.id"];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use('/', cors(corsOptionsDelegate), userRoutes); // Define all user routes
app.use('/', cors(corsOptionsDelegate), recipeRoutes); // Define all recipes
app.use('/', cors(corsOptionsDelegate), commentRoutes); // Define all comments
app.use('/', cors(corsOptionsDelegate), authRoutes);

// end of bottom code
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})