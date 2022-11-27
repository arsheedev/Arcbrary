const express = require('express')
const router = express.Router()
const {getAllAuthors, postNewAuthor, getNewAuthor, getSingleAuthor, getEditAuthor, putEditAuthor, deleteAuthor} = require('../controllers/authors')

router.route('/')
    .get(getAllAuthors)
    .post(postNewAuthor)

router.route('/new')
    .get(getNewAuthor)

router.route('/:id')
    .get(getSingleAuthor)
    .put(putEditAuthor)
    .delete(deleteAuthor)

router.route('/:id/edit')
    .get(getEditAuthor)

module.exports = router