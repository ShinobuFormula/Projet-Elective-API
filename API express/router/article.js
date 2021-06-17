const express = require('express')
const router = express.Router()
const Article = require("../models/article.model");
const db = require("../db");

router.get('/', function (req, res)
{
    Article.default.find( (err, articles) =>
    {
        if (err) return handleError(err);
        res.json(articles)

    })
})

router.post('/', function (req, res)
{
    Article.createArticle(req.body)

    res.status(201).send('you added a new article')
})

router.delete('/:id', function (req, res)
{
    Article.deleteArticle(req.params.id)

    res.status(201).send('you deleted an article')
})

module.exports = router;