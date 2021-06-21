const express = require('express')
const router = express.Router()
const Order = require("../models/order.model");
const TokenController = require("../controller/token-verifier")
const db = require("../db");

router.get('/', function (req, res)
{
    Order.getAllOrders().then( (orders) => {
        res.json(orders)
    })
})

router.get('/:id', function (req, res)
{
    Order.getOneOrder(req).then((order) => {
        res.json(order)
    })
})

router.post('/', function (req, res)
{
    Order.createOrder(req.body)

    res.status(201).send('you added a new article')
})

router.put('/:id', function (req, res)
{
    if(TokenController.verifyToken(req.cookies, 2)){
        Order.updateOneOrder(req)

        res.status(201).send('you updated an article')
    }
    else{
        res.status(403).send('Token invalid or Unauthorized call')
    }
})

router.delete('/:id', function (req, res)
{
    Order.deleteOrder(req.params.id)

    res.status(201).send('you deleted an article')
})

module.exports = router;