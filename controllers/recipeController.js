const model = require("../model/recipeModel");

const getRecipeId = async (req, res) => {
  try {
    // const { id } = req.params; // ini
    const { recipe_id } = req.body; // ini

    if (parseInt(recipe_id)) {
      const getData = await model.getRecipeById(recipe_id);
      res.send({ data: getData.rows, jumlahData: getData.rowCount });
    } else {
      res.status(400).send("angka tidak valid");
    }
  } catch (error) {
    console.log("error",error)
    res.status(400).send("ada yang error");
  }
};

const addRecipe = async (req, res) => {
  try {
    const { recipe_id, title, ingredients, photo_recipe, video_recipe } = req.body;

    const addRecipe = await model.addRecipe({ recipe_id, title, ingredients, photo_recipe, video_recipe });

    if (addRecipe) {
      res.send("data berhasil di tambah");
    } else {
      res.status(400).send("data gagal di tambah");
    }
  } catch (error) {
    console.log("error",error)
    res.status(400).send("ada yang error");
  }
};

const editRecipe = async (req, res) => {
  try {
    const { recipe_id, title, ingredients, photo_recipe, video_recipe } = req.body;

    // Check recipe by id
    const getData = await model.getRecipeById(recipe_id);

    if (getData.rowCount > 0) {
      let inputTitle = title || getData?.rows[0]?.title;
      let inputIngredients = ingredients || getData?.rows[0]?.ingredients;
      let inputRecipePhoto = photo_recipe || getData?.rows[0]?.photo_recipe;
      let inputRecipeVideo = video_recipe || getData?.rows[0]?.video_recipe;

      let message = "";

      if (title) message += "title,";
      if (ingredients) message += "ingredients,";
      if (photo_recipe) message += "photo,";
      if (video_recipe) message += "video,";

      const editData = await model.editRecipe({
        title: inputTitle,
        ingredients: inputIngredients,
        photo_recipe: inputRecipePhoto,
        video_recipe: inputRecipeVideo,
        recipe_id,
      });

      if (editData) {
        res.send(`${message} berhasil di ubah`);
      } else {
        res.status(400).send("data gagal di ubah");
      }
    } else {
      res.status(400).send("data tidak di temukan");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("ada yang error");
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const { recipe_id } = req.body;

    // Check recipe by id
    const getDataRecipe = await model.getRecipeById(recipe_id);

    if (getDataRecipe.rowCount > 0) {
      const deleteRecipe = await model.deleteRecipe(recipe_id);

      if (deleteRecipe) {
        res.send(`data Recipe ke ${recipe_id} berhasil di hapus`);
      } else {
        res.status(400).send("data gagal di hapus");
      }
    } else {
      res.status(400).send("data tidak di temukan");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("ada yang error");
  }
};

module.exports = { getRecipeId, addRecipe, editRecipe, deleteRecipe };