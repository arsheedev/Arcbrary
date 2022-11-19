const db = require('mongoose')

const connectDB = url => {
    return db.connect(url)
}

module.exports = connectDB