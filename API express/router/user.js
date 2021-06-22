const express = require('express')
const router = express.Router()
const jwt = require("jsonwebtoken");
const UserController = require("../controller/user.controller")

router.get('/:type/:id', function (req, res)
{
    UserController.getUser(req.params.id, req.params.type).then( (userData) => {
        res.json(userData)
    })
})

router.get('/:type', function (req, res)
{
    UserController.getAllUserByType(req.params.type).then( (usersData) => {
        res.json(usersData)
    })
})


router.post('/create/:type', function (req, res)
{
    UserController.createUser(req.body, req.params.type)

    res.status(201).send('you added a new user')
})

router.post('/login/:type', function (req, res)
{
    UserController.loginUser(req.body, req.params.type).then( (userData) => {
        res.json(userData)
    })

  /*  res.writeHead(200, {
        "Set-Cookie": "token=" + jwt.sign({uid: '16', role: '2'}, 'your-256-bit-secret', { expiresIn: '1h' }) + "; HttpOnly",
        "Access-Control-Allow-Credentials" : "true"
    }).send() */
})

router.get('/privateInfo', function (req, res)
{


    res.send("ok")
})

router.delete('/:id', function (req, res)
{
 //   User.deleteUser(req.params.id)

    res.status(200).send('you deleted a user')
})

module.exports = router;