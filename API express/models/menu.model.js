"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const menuSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    rid: {
        type: Number,
        required: true
    },
    content: {
        type: Array,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
});
const menuModel = mongoose_1.model('Menu', menuSchema);
exports.getAllMenus = async () => {
    const menus = await menuModel.find();
    return menus;
};
exports.getOneMenu = async (req) => {
    const menu = await menuModel.findOne({ _id: req.params.id });
    return menu;
};
exports.getMenubyId = async (id) => {
    const menu = await menuModel.findOne({ _id: id });
    return menu;
};
exports.getAllMenusbyRestaurant = async (rid) => {
    const menus = await menuModel.find({ rid: rid });
    return menus;
};
exports.createMenu = (menuData) => {
    const menu = new menuModel(menuData);
    return menu.save();
};
exports.updateOneMenu = async (req) => {
    const menu = await menuModel.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true
    });
    menu.save();
};
exports.deleteMenu = (menuID) => {
    menuModel.deleteOne({ _id: menuID });
};
exports.default = menuModel;
