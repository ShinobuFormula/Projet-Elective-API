const express = require('express')
const router = express.Router()
const Order = require("../models/order.model");
const db = require("../db");

router.get('/', function (req, res)
{
    /*Order.default.find( (err, articles) =>
    {
        if (err) return handleError(err);
        res.json(articles)

    }) */

    console.log(Order.getAllOrder())
    res.json(Order.getAllOrder())

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