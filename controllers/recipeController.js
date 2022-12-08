const model = require('../model/recipeModel')
const moment = require('moment')

const getRecipes = async (req, res) => {
  try {
    const getDataRecipe = await model.getAllRecipes()

    res.send({ data: getDataRecipe.rows, jumlahDataRecipe: getDataRecipe.rowCount })
  } catch (error) {
    console.log('error', error)
    res.send(
      {
        result: {
          message: 'Something went wrong',
          code: 400
        }
      })
  }
}

const getRecipeId = async (req, res) => {
  try {
    const { recipe_id } = req.params;
    const getData = await model.getRecipeById(recipe_id);

    if (getData.rowCount > 0) {
      if (parseInt(recipe_id)) {
        res.send(
          {
            data: getData.rows,
            jumlahData: getData.rowCount
          })
      } else {
        res.status(400).send('Invalid number!')
      }
    } else
      res.status(400).send('Recipe id not found!')
  } catch (error) {
    console.log('error', error)
    res.send(
      {
        result: {
          message: 'Something went wrong',
          code: 400
        }
      })
  }
}


const getRecipeName = async (req, res) => {
  try {
    const { title } = req.params
    const getDataRecipe = await model.getRecipeByName(title)

    res.send(
      {
      data: getDataRecipe.rows,
      jumlahData: getDataRecipe.rowCount
    })
  } catch (error) {
    console.log('error', error)
    res.send(
      {
        result: {
          message: 'Something went wrong',
          code: 400
        }
      })
  }
}

const getRecipeUser = async (req, res) => {
  try {
    const { user_id } = req.params
    const getDataRecipe = await model.getRecipeByUser(user_id)

    res.send(
      {
      data: getDataRecipe.rows,
      jumlahData: getDataRecipe.rowCount
    })
  } catch (error) {
    console.log('error', error)
    res.send(
      {
        result: {
          message: 'Something went wrong',
          code: 400
        }
      })
  }
}

const getLatestRecipes = async (req, res) => {
  try {
    const getDataRecipe = await model.getLatestRecipe()
    const data = getDataRecipe.rows
    const maxData = 5

    if (data > maxData) {
      data.length = maxData
    }
    res.send(
      { 
        data, 
        jumlahDataRecipe: data.length 
      })
  } catch (error) {
    console.log('error', error)
    res.send(
      {
        result: {
          message: 'Something went wrong',
          code: 400
        }
      })
  }
}

const addRecipe = async (req, res) => {
  try {
    const { recipe_id, user_id } = req.query
    const { title, ingredients, recipe_photo, recipe_videos } = req.body
    recipes.created_at = moment().format()

    const addRecipe = await model.addRecipe(recipes)

    if (addRecipe) {
      res.send(
        {
          result: { 
            message: 'Berhasil Menambahkan Data Recipe',
            code: 200
          }
        }
      )
    } else {
      res.status(400).send('data gagal di tambah')
    }
  } catch (error) {
    console.log('error', error)
    res.send(
      {
        result: {
          message: 'Something went wrong',
          code: 400
        }
      })
  }
}

const editRecipe = async (req, res) => {
  try {
    const { recipe_id, user_id } = req.query
    const { title, ingredients, recipe_photo, recipe_videos } = req.body

    // Check recipe by id
    const getData = await model.getRecipeById(recipe_id)

    if (getData.rowCount > 0) {
      const inputTitle = title || getData?.rows[0]?.title
      const inputIngredients = ingredients || getData?.rows[0]?.ingredients
      const inputRecipePhoto = recipe_photo || getData?.rows[0]?.recipe_photo
      const inputRecipeVideo = recipe_videos || getData?.rows[0]?.recipe_videos

      let message = ''

      if (title) message += 'title,'
      if (ingredients) message += 'ingredients,'
      if (recipe_photo) message += 'photo,'
      if (recipe_videos) message += 'video,'

      const editData = await model.editRecipe({
        title: inputTitle,
        ingredients: inputIngredients,
        recipe_photo: inputRecipePhoto,
        recipe_videos: inputRecipeVideo,
        recipe_id
      })

      if (editData) {
        res.send(`${message} berhasil di ubah`)
      } else {
        res.status(400).send('data gagal di ubah')
      }
    } else {
      res.status(400).send('data tidak di temukan')
    }
  } catch (error) {
    console.log(error)
    res.send(
      {
        result: {
          message: 'Something went wrong',
          code: 400
        }
      })
  }
}

const deleteRecipe = async (req, res) => {
  try {
    const { recipe_id } = req.params

    // Check recipe by id
    const getDataRecipe = await model.getRecipeById(recipe_id)

    if (getDataRecipe.rowCount > 0) {
      const deleteRecipe = await model.deleteRecipe(recipe_id)

      if (deleteRecipe) {
        res.send(`data Recipe ke ${recipe_id} berhasil di hapus`)
      } else {
        res.status(400).send('data gagal di hapus')
      }
    } else {
      res.status(400).send('data tidak di temukan')
    }
  } catch (error) {
    console.log(error)
    res.send(
      {
        result: {
          message: 'Something went wrong',
          code: 400
        }
      })
  }
}

module.exports = {
  getRecipes,
  getRecipeId,
  getRecipeName,
  getRecipeUser,
  getLatestRecipes,
  addRecipe,
  editRecipe,
  deleteRecipe
}
