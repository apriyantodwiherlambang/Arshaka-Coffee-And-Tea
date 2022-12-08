const model = require('../model/commentModel')

const getComments = async (req, res) => {
  try {
    const getDataComment = await model.getAllComment()

    res.send({ 
      data: getDataComment.rows, 
      jumlahDataComment: getDataComment.rowCount 
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

const getCommentId = async (req, res) => {
  try {
    const { comment_id } = req.params

    if (parseInt(comment_id)) {
      const getDataComment = await model.getCommentById(comment_id)
      res.send({ 
        data: getDataComment.rows, 
        jumlahDataComment: getDataComment.rowCount })
    } else {
      res.status(400).send('angka tidak valid')
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

const getCommentRecipe = async (req, res) => {
  try {
    const { recipe_id } = req.params
    const getDataComment = await model.getCommentByRecipe(recipe_id)

    res.send({
      data: getDataComment.rows,
      jumlahData: getDataComment.rowCount
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

const addComment = async (req, res) => {
  try {
    const { comment_id, comment, user_id, recipe_id } = req.body

    const addComment = await model.addComment({ comment_id, comment, user_id, recipe_id })

    if (addComment) {
      res.send('data berhasil di tambah')
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

const editComment = async (req, res) => {
  try {
    const { comment_id, comment, user_id, recipe_id } = req.body

    // Check comment by id
    const getDataComment = await model.getCommentById(comment_id)

    if (getDataComment.rowCount > 0) {
      const inputComment = comment || getDataComment?.rows[0]?.comment
      const inputUser = user_id || getDataComment?.rows[0]?.user_id
      const inputRecipe = recipe_id || getDataComment?.rows[0]?.recipe_id

      let message = ''

      if (comment) message += 'comment,'
      if (user_id) message += 'user_id,'
      if (recipe_id) message += 'recipe_id,'

      const editData = await model.editComment({
        comment: inputComment,
        user_id: inputUser,
        recipe_id: inputRecipe,
        comment_id
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

const deleteComment = async (req, res) => {
  try {
    const { comment_id } = req.params

    // Check comment by id
    const getDataComment = await model.getCommentById(comment_id)

    if (getDataComment.rowCount > 0) {
      const deleteComment = await model.deleteComment(comment_id)

      if (deleteComment) {
        res.send(`data Comment ke ${comment_id} berhasil di hapus`)
      } else {
        res.status(400).send('comment gagal di hapus')
      }
    } else {
      res.status(400).send('comment tidak di temukan')
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
  getComments,
  getCommentId,
  getCommentRecipe,
  addComment,
  editComment,
  deleteComment
}
