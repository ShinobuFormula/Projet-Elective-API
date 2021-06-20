import {model, Schema} from 'mongoose';
import menuModel from "./menu.model";

interface Article {
    name: string,
    prix: number,
    monnaie: string
}

const articleSchema = new Schema<Article>({
    name: String,
    prix: Number,
    monnaie: String
})

const articleModel = model('Article', articleSchema)

exports.getAllArticles = async () => {
    const articles = await articleModel.find();
    return articles;
}

exports.getOneArticle = async (req:any) => {
    const article = await articleModel.findOne( {_id: req.params.id}, 'name prix monnaie')
    return article
}

exports.createArticle = (articleData:JSON) => {
    const article = new articleModel(articleData);
    return article.save();
};

exports.deleteArticle = (articleID:any) => {
    articleModel.deleteOne({_id:articleID}, function (err){
        if (err) return console.log(err)
    })
};

export default articleModel;
