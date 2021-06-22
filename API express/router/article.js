const express = require('express')
const router = express.Router()
const Article = require("../models/article.model");
const TokenController = require("../controller/token-verifier")


router.get('/', function (req, res)
{

    Article.getAllArticles().then((articles) => {
        res.json(articles)
    })
})

router.get('/:id', function (req, res)
{
    Article.getOneArticle(req).then((article) => {
        res.json(article)
    })
})

router.post('/', function (req, res)
{
    Article.createArticle(req.body)

    res.status(201).send('you added a new article')
})

router.put('/:id', function (req, res)
{
    if(TokenController.verifyToken(req.cookies, 2)){
        Article.updateOneArticle(req)

        res.status(201).send('you updated an article')
    }
    else{
        res.status(403).send('Token invalid or Unauthorized call')
    }
})

router.delete('/:id', function (req, res)
{
    Article.deleteArticle(req.params.id)

    res.status(201).send('you deleted an article')
})

module.exports = router;