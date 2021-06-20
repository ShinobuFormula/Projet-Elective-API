const express = require('express')
const router = express.Router()
const Order = require("../models/order.model");
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

router.delete('/:id', function (req, res)
{
    Order.deleteOrder(req.params.id)

    res.status(201).send('you deleted an article')
})

module.exports = router;