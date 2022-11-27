const express = require('express')
const router = express.Router()
const {getAllBooks, postNewBook, getNewBook, putNewBook, getSingleBook, getEditBook, deleteBook} = require('../controllers/books')

router.route('/')
  .get(getAllBooks)
  .post(postNewBook)

router.route('/new')
  .get(getNewBook)

router.route('/:id')
  .get(getSingleBook)
  .put(putNewBook)
  .delete(deleteBook)

router.route('/:id/edit')
  .get(getEditBook)

module.exports = router