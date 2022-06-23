const db = require("../db");
const model = require("../model/searchRecipeModel");

const getRecipes = async (req, res) => {
  try {
    const getDataRecipe = await model.getAllRecipe();

    res.send({ data: getDataRecipe.rows, jumlahDataRecipe: getDataRecipe.rowCount });
  } catch (error) {
    console.log("error", error)
    res.status(400).send("ada yang error");
  }
};

const findNameRecipes = async (req, res) => {
  try {
    const { name } = req.body;
    const getDataRecipe = await model.getByName(name);

    res.send({
      data: getDataRecipe.rows,
      jumlahData: getDataRecipe.rowCount,
    });
  } catch (error) {
    console.log("error",error)
    res.status(400).send("ada yang error");
  }
};

module.exports = { getRecipes, findNameRecipes };