const express = require('express')
const router = express.Router()
//const User = require("../models/user.model");
const db = require("../db");
const jwt = require("jsonwebtoken");


router.get('/', function (req, res)
{
    /*User.default.find( (err, articles) =>
    {
        if (err) return handleError(err);
        res.json(articles)
    }) */
})

router.post('/create', function (req, res)
{
    //User.createUser(req.body)

    res.status(201).send('you added a new user')
})

router.post('/connect', function (req, res)
{
    //User.connectUser(req.body)

    res.writeHead(200, {
        "Set-Cookie": "token=" + jwt.sign({uid: '16', role: '2'}, 'your-256-bit-secret', { expiresIn: '1h' }) + "; HttpOnly",
        "Access-Control-Allow-Credentials" : "true"
    }).send()
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