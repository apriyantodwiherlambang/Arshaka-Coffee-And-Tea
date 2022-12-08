const Router = require('express').Router()
const upload = require('../../middleware/upload')

// Upload Single Image
Router.post('/images', upload.uploadSingle, (req, res) => {
  res.send('sukses upload user photo')
})

Router.post('/images', upload.uploadRecipeImages, (req, res) => {
  res.send('sukses upload recipe photo')
})

Router.delete('/image', upload.deleteFile)

module.exports = Router
