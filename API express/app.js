const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser")
const menu = require('./router/menu')
const article = require('./router/article')
const user = require('./router/user')
const order = require('./router/order')


app.use(bodyParser.json())
app.use(cookieParser());

app.use('/menu', menu)
app.use('/article', article)
app.use('/user', user)
app.use('/order', order)

app.get('/', function (req, res) {
    res.send('Default request')
})

app.listen(3000)