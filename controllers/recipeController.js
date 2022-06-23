const model = require("../model/recipeModel");

const getRecipeId = async (req, res) => {
  try {
    // const { id } = req.params; // ini
    const { id } = req.query; // ini

    var CryptoJS = require("crypto-js");

    // Decrypt
    var bytes = CryptoJS.AES.decrypt(id, "secret key 1234");
    var originalText = bytes.toString(CryptoJS.enc.Utf8);

    if (parseInt(originalText)) {
      const getData = await model.getRecipeById(originalText);
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
    const getData = await model.getRecipeById(id);

    if (getData.rowCount > 0) {
      let inputTitle = title || getData?.rows[0]?.title;
      let inputIngredients = ingredients || getData?.rows[0]?.ingredients;
      let inputRecipePhoto = photo_recipe || getData?.rows[0]?.recipe_photo;
      let inputRecipeVideo = video_recipe || getData?.rows[0]?.recipe_video;

      let message = "";

      if (title) message += "nama,";
      if (ingredients) message += "email,";
      if (photo_recipe) message += "password,";
      if (video_recipe) message += "phone,";

      const editData = await model.editUser({
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
    const { id } = req.body;

    // Check recipe by id
    const getData = await model.getRecipeById(id);

    if (getData.rowCount > 0) {
      const deleteRecipe = await model.deleteRecipe(id);

      if (deleteRecipe) {
        res.send(`data Recipe ke ${id} berhasil di hapus`);
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