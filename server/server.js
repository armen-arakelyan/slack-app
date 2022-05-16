const express = require('express')
const app = express()
const bodyParser = require('body-parser').urlencoded({ extended: true })
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

app.use(express.json())

const cors = require('cors')

app.use(cors())

const schema = mongoose.Schema({
    name: String,
    mail: String,
    password: String
})

mongoose.connect('mongodb+srv://Armen:1234@cluster0.wscaf.mongodb.net/?retryWrites=true&w=majority/slack-app')
    .then(() => console.log('Connected to db'))
    .catch(() => console.log('Some error'))

const model = mongoose.model('users', schema)

app.get('/getUser/:data', async (req, res) => {
    const { mail, password } = JSON.parse(req.params.data)
    const mymodel = await model.find({
        mail: mail,
        password: password
    })
    res.send(mymodel)
})

app.post('/addUser', bodyParser, async (req, res) => {
    if (req.body.mail !== 0 && req.body.password !== 0 && req.body.name !== 0) {
        await model.find({ mail: req.body.mail }, async (err, data) => {
            console.log('1')
            if(err){
                throw err
            }
            if(data.length !== 0){
                res.send('This mail already used')
            } else {
                await model({
                    name: req.body.name,
                    mail: req.body.mail,
                    password: req.body.password
                }).save()
                res.send('Registred Successfuly!')
            }
        }).catch(err => console.log('err'))
    }
})

app.listen(8080)