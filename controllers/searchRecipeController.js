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

const getLastesRecipes = async (req, res) => {
  try {
    const getDataRecipe = await model.getAllRecipe();
    const data = getDataRecipe.rows;
    const maxData = 5;

    if(data > maxData){
      data.length = maxData
    }
    res.send({ data: getDataRecipe.rows, jumlahDataRecipe: getDataRecipe.rowCount });
  } catch (error) {
    console.log("error", error)
    res.status(400).send("ada yang error");
  }
};

const findNameRecipes = async (req, res) => {
  try {
    const { title } = req.body;
    const getDataRecipe = await model.getByName(title);
    
    res.send({
      data: getDataRecipe.rows,
      jumlahData: getDataRecipe.rowCount,
    });
  } catch (error) {
    console.log("error",error)
    res.status(400).send("ada yang error");
  }
};

module.exports = { getRecipes, getLastesRecipes, findNameRecipes };