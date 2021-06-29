"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const articleSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    rid: {
        type: Number,
        required: true
    },
    type: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
});
const articleModel = mongoose_1.model('Article', articleSchema);
exports.getAllArticles = async () => {
    const articles = await articleModel.find();
    return articles;
};
exports.getOneArticle = async (req) => {
    const article = await articleModel.findOne({ _id: req.params.id });
    return article;
};
exports.getArticlebyId = async (id) => {
    const article = await articleModel.findOne({ _id: id });
    return article;
};
exports.getAllArticlesbyRestaurant = async (rid) => {
    const articles = await articleModel.find({ rid: rid });
    return articles;
};
exports.createArticle = (articleData) => {
    const article = new articleModel(articleData);
    return article.save();
};
exports.updateOneArticle = async (req) => {
    const article = await articleModel.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true
    });
    article.save();
};
exports.deleteArticle = (articleID) => {
    articleModel.deleteOne({ _id: articleID }, function (err) {
        if (err)
            return console.log(err);
    });
};
exports.default = articleModel;
