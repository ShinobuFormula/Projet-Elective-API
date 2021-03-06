import {Schema, model} from 'mongoose';

interface Menu {
    name: string,
    rid: number,
    content: string[]
    price: number
}

const menuSchema = new Schema<Menu>({
    name: {
        type :String,
        required: true
    },
    rid: {
        type : Number,
        required: true
    },
    content:{
        type :Array,
        required: true
    },
    price:{
        type :Number,
        required: true
    },
})

const menuModel = model('Menu', menuSchema)

exports.getAllMenus = async () => {
    const menus = await menuModel.find();
    return menus;
}

exports.getOneMenu = async (req:any) => {
    const menu = await menuModel.findOne( {_id: req.params.id})
    return menu
}

exports.getMenubyId = async (id:string) => {
    const menu = await menuModel.findOne( {_id: id})
    return menu
}

exports.getAllMenusbyRestaurant = async (rid:number) => {
    const menus = await menuModel.find( {rid: rid});
    return menus;
}

exports.createMenu = (menuData:JSON) => {
    const menu = new menuModel(menuData);
    return menu.save()
};

exports.updateOneMenu = async (req:any) => {
    const menu = await menuModel.findOneAndUpdate({_id: req.params.id}, req.body, {
        new: true
    });
    return menu.save();
}

exports.deleteMenu = async (menuID:any) => {
    const menu = await menuModel.deleteOne({_id:menuID})
    return menu
};

export default menuModel;
