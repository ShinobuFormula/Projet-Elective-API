const express = require('express')
const router = express.Router()
const UserController = require("../controller/user.controller")
const TokenController = require("../controller/token-verifier")


router.get('/', function (req, res)
{
    UserController.getAllUser().then( (userData) => {
        res.json(userData)
    })
})

router.get('/:type', function (req, res)
{
    UserController.getAllUserByType(req.params.type).then( (usersData) => {
        res.json(usersData)
    })
})

router.get('/:type/:id', function (req, res)
{
    UserController.getUser(req.params.id, req.params.type).then( (userData) => {
        res.json(userData)
    })
})

router.get('/email/:type/:id', function (req, res)
{
    UserController.getUserbyEmail(req.params.id, req.params.type).then( (userData) => {
        res.json(userData)
    })
})

router.post('/verify', function (req, res)
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
    UserController.createUser(req.body, req.params.type, null).then( (user) => {
        res.status(201).json(user)
    })
})

router.post('/create/:type/:sponsor', function (req, res)
{
    UserController.createUser(req.body, req.params.type, req.params.sponsor).then( (user) => {
        res.status(201).json(user)
    })
})

router.put('/:type/:id', function (req, res)
{
    UserController.updateUser(req.body, req.params.type ,req.params.id).then( (user) => {
        res.status(200).json(user)
    })
})

router.post('/login/:type', function (req, res)
{
    UserController.loginUser(req.body, req.params.type).then( (data) => {
        res.cookie("token", data.token, {
            path: "/"
        }).json(data.userData)
    })
})

router.delete('/log/:id', function (req, res)
{
    if(TokenController.verifyToken(req.cookies, 5)) {
        UserController.deleteLog(req.params.id)
        res.status(200).send('you deleted a log')
    }
    else
    {
        res.status(403).send('Token invalid or Unauthorized call')
    }
})

router.delete('/:type/:id', function (req, res)
{
    UserController.deleteUser(req.params.id, req.params.type)

    res.status(200).send('you deleted a user')
})



module.exports = router;