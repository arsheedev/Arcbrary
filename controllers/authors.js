const Author = require('../models/author')
const Book = require('../models/book')

const getAllAuthors = async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const authors = await Author.find(searchOptions)
        res.render('authors/index', {
            authors: authors,
            searchOptions: req.query
        })
    } catch (error) {
        res.redirect('/')
    }
}

const postNewAuthor = async (req, res) => {
    const author = new Author({
        name: req.body.name
    })

    try {
        const newAuthor = await author.save()
        res.redirect(`authors/${newAuthor.id}`)
    } catch (error) {
        res.render('authors/new', {author: author, msg: `Error creating Author`})  
    }
}

const getNewAuthor = (req, res) => {
    res.render('authors/new', { author: new Author() })
}

const getSingleAuthor = async (req, res) => {
    try {
        const author = await Author.findById(req.params.id)
        const books = await Book.find({author: author.id}).limit(6).exec()
        res.render('authors/show', {author: author, bookByAuthor: books})
    } catch (error) {
        res.redirect('/')
    }
}

const getEditAuthor = async (req, res) => {
    try {
        const author = await Author.findById(req.params.id)
        res.render('authors/edit', { author: author })
    } catch (error) {
        res.redirect('/authors')
    }
}

const putEditAuthor = async (req, res) => {
    let author
    try {
        author = await Author.findById(req.params.id)
        author.name = req.body.name
        await author.save()
        res.redirect(`/authors/${author.id}`)
    } catch (error) {
        if (author == null) {
            res.redirect('/')
        } else {
            res.render('authors/edit', {author: author, msg: `Error updating Author`})
        }
    }
}

const deleteAuthor = async (req, res) => {
    let author
    try {
        author = await Author.findById(req.params.id)
        author.name = req.body.name
        await author.remove()
        res.redirect(`/authors`)
    } catch (error) {
        if (author == null) {
            res.redirect('/')
        } else {
            res.redirect(`/authors/${author.id}`)
        }
    }
}

module.exports = {
    getAllAuthors,
    postNewAuthor,
    getNewAuthor,
    getSingleAuthor,
    getEditAuthor,
    putEditAuthor,
    deleteAuthor
}