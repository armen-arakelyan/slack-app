const mongoose = require('mongoose')
require('dotenv').config()

const DB_URL = process.env.MONGO_URL

mongoose.connect(`${DB_URL}/slack_app`)
    .then(() => console.log('Connected to db'))
    .catch(() => console.log('Some error'))

const schema = mongoose.Schema({
    name: String,
    mail: String,
    password: String
})

exports.user = mongoose.model('users', schema)