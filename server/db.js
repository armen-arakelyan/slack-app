const mongoose = require('mongoose')
require('dotenv').config()

const Schema = mongoose.Schema;
const DB_URL = process.env.MONGO_URL


mongoose.connect(`${DB_URL}`)
    .then(() => console.log('Connected to db'))
    .catch(() => console.log('Some error'))

const schema = mongoose.Schema({
    name: String,
    mail: String,
    password: String
})

const userToken = mongoose.Schema({
    userId: {
		type: Schema.Types.ObjectId,
		required: true,
	},
	token: {
		type: String,
		required: true,
	}
})

const channelsSchema =  mongoose.Schema({
    title: String
})

exports.user = mongoose.model('users', schema)
exports.userToken = mongoose.model('usersToken' , userToken)
exports.channels = mongoose.model('channel', channelsSchema)