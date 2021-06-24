const express = require('express')
const router = express.Router()
const Order = require("../models/order.model");
const TokenController = require("../controller/token-verifier")

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

router.get('/deliver/:orderID', function (req, res)
{
    if(TokenController.verifyToken(req.cookies, 3)) {
        Order.deliverOrder(req.params.orderID)
        res.status(201).send('you delivered a new order')
    }
    else{
        res.status(403).send('Token invalid or Unauthorized call')
    }
})

router.get('/accept/:id/:userID', function (req, res)
{
    if(TokenController.verifyToken(req.cookies, 3)) {
        Order.acceptOrder(req.params.id, req.params.userID)
        res.status(201).send('you accepted a new order')
    }
    else{
        res.status(403).send('Token invalid or Unauthorized call')
    }
})

router.get('/user/:userID', function (req, res)
{
        Order.getAllOrdersbyCustomer(req.params.userID).then( (orders) => {
            res.json(orders)
        })
})

router.post('/', function (req, res)
{
    if(TokenController.verifyToken(req.cookies, 1)) {
        Order.createOrder(req.body)

        res.status(201).send('you added a new order')
    }
    else
    {
        res.status(403).send('Token invalid or Unauthorized call')
    }
})

router.put('/:id', function (req, res)
{
    if(TokenController.verifyToken(req.cookies, 1)){
        Order.updateOneOrder(req)

        res.status(201).send('you updated an order')
    }
    else{
        res.status(403).send('Token invalid or Unauthorized call')
    }
})

router.delete('/:id', function (req, res)
{
    if(TokenController.verifyToken(req.cookies, 1)) {
        Order.deleteOrder(req.params.id)
    }
    else{
        res.status(201).send('you deleted an order')
    }
})

module.exports = router;