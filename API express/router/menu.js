const express = require('express')
const router = express.Router()
const Menu = require("../models/menu.model");
const db = require("../db");

router.get('/', function (req, res)
{
    Menu.default.find( (err, menus) =>
    {
        if (err) return handleError(err);
        res.json(menus)
    })
})

router.get('/:name', function (req, res)
{
    Menu.default.findOne({'name': req.params.name}, 'prix monnaie', (err, menu) =>
    {
        if (err) return handleError(err);

        res.json(menu)
    })
})

router.post('/', function (req, res)
{
    Menu.createMenu(req.body)

    res.status(201).send('you added a new article')
})

router.delete('/:id', function (req, res)
{
    Menu.deleteMenu(req.params.id)

    res.status(201).send('you deleted a menu')
})

module.exports = router;