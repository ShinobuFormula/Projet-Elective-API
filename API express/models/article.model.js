"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var articleSchema = new mongoose_1.Schema({
    name: String,
    prix: Number,
    monnaie: String
});
var articleModel = mongoose_1.model('Article', articleSchema);
exports.getAllArticles = function () {
    return articleModel.find(function (err, articles) {
        if (err)
            return err;
        else
            return articles;
    });
};
exports.createArticle = function (articleData) {
    var article = new articleModel(articleData);
    return article.save();
};
exports.deleteArticle = function (articleID) {
    articleModel.deleteOne({ _id: articleID }, function (err) {
        if (err)
            return console.log(err);
    });
};
exports["default"] = articleModel;
