import {Schema, model} from 'mongoose';

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
