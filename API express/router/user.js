const express = require('express')
const router = express.Router()
const UserController = require("../controller/user.controller")
const TokenController = require("../controller/token-verifier")

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

router.patch('/verify', function (req, res)
{
    const verifiedData = TokenController.verifyTokenLogin(req.cookies)
    if(verifiedData.response)
    {
        res.json(verifiedData.userData)
    }
    else {
        res.status(401).send("Invalid Token")
    }

})

router.post('/create/:type', function (req, res)
{
    UserController.createUser(req.body, req.params.type)

    res.status(201).send('you added a new user')
})

router.post('/login/:type', function (req, res)
{
    UserController.loginUser(req.body, req.params.type).then( (token) => {
        res.writeHead(200, {
            "Set-Cookie": "token=" + token + "; HttpOnly",
            "Access-Control-Allow-Credentials" : "true"
        }).send()
    })
})

router.delete('/:type/:id', function (req, res)
{
    UserController.deleteUser(req.params.id, req.params.type)

    res.status(200).send('you deleted a user')
})

module.exports = router;