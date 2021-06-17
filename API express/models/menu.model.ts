import {Schema, model} from 'mongoose';

interface Menu {
    name: string,
    prix: number,
    monnaie: string
}

const menuSchema = new Schema<Menu>({
    name: String,
    prix: Number,
    monnaie: String
})

const menuModel = model('Menu', menuSchema)

exports.createMenu = (menuData:JSON) => {
    const menu = new menuModel(menuData);
    return menu.save();
};

exports.deleteMenu = (menuID:any) => {
    menuModel.deleteOne({_id:menuID}, function (err){
        if (err) return console.log(err)
    })
};

export default menuModel;
