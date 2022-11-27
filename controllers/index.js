const Book = require('../models/book')

const getIndex = async (req, res) => {
    let books
    try {
        books = await Book.find().sort({ createAt: 'desc'}).limit(10).exec()
    } catch {
        books = []
    }
    res.render('index', { books: books})
}

module.exports = {getIndex}