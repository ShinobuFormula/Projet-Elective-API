const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser")
const cors = require("cors")
const menu = require('./router/menu')
const article = require('./router/article')
const user = require('./router/user')
const order = require('./router/order')
const db = require('./mongo.db')


app.use(bodyParser.json())
app.use(cookieParser());
app.use(cors());

app.use('/menu', menu)
app.use('/article', article)
app.use('/order', order)
app.use('/user', user)

app.get('/', function (req, res) {
    res.send('Default request')
})

app.listen(3000)