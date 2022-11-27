if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const connectDB = require('./db/connect')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const PORT = process.env.PORT || 8080

const start = async () => {
    try {
        await connectDB(process.env.DATABASE_URL)
        app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))
    } catch (error) {
        console.error(error)
    }
}

// Midleware
app.set('view engine', 'ejs')
app.set('views', './views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ limit: '15mb', extended: false}))
app.use(express.static('public'))

// Routes
const indexRoute = require('./routes/index')
const authorsRoute = require('./routes/authors')
const booksRoute = require('./routes/books')

app.use('/', indexRoute)
app.use('/authors', authorsRoute)
app.use('/books', booksRoute)

start()