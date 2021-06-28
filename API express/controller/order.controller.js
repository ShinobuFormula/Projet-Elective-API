const MenuModel = require('../models/menu.model')
const ArticleModel = require('../models/article.model')



exports.fillCart = async(arrayOfId) => {
    let temp = []
    for(const id of arrayOfId){
        let test = await MenuModel.getMenubyId(id)
        if(test === null){
            let test = await ArticleModel.getArticlebyId(id)
            temp.push(test)
        }
        else{
            temp.push(test)
        }
    }
    return temp
}