const express = require('express')
const router = express.Router()
const Menu = require("../models/menu.model");
const OrderController = require('../controller/order.controller')
const TokenController = require("../controller/token-verifier")


router.get('/', function (req, res)
{
    Menu.getAllMenus().then( (menus) => {
        res.json(menus)
    })
})

router.get('/:id', function (req, res)
{
    Menu.getOneMenu(req).then( (menu) => {
        res.json(menu)
    })
})

router.get('/restaurant/:id', function (req, res)
{
    Menu.getAllMenusbyRestaurant(req.params.id).then( (menus) => {
        res.json(menus)
    })
})

router.post('/', function (req, res)
{
    if(TokenController.verifyToken(req.cookies, 2)){
        Menu.createMenu(req.body)

        res.status(201).send('you added a new menu')
    }
    else{
        res.status(403).send('Token invalid or Unauthorized call')
    }
})

router.post('/cart', function (req, res)
{
    if(TokenController.verifyToken(req.cookies, 1)){
        OrderController.fillCart(req.body).then( (data) => {
            res.json(data)
        })
    }
    else{
        res.status(403).send('Token invalid or Unauthorized call')
    }
})

router.put('/:id', function (req, res)
{
    if(TokenController.verifyToken(req.cookies, 2)){
        Menu.updateOneMenu(req)

        res.status(200).send('you updated a menu')
    }
    else{
        res.status(403).send('Token invalid or Unauthorized call')
    }
})

router.delete('/:id', function (req, res)
{
    if(TokenController.verifyToken(req.cookies, 2)) {
        Menu.deleteMenu(req.params.id)

        res.status(200).send('you deleted a menu')
    }
    else{
        res.status(403).send('Token invalid or Unauthorized call')
    }
})

module.exports = router;