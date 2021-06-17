"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var menuSchema = new mongoose_1.Schema({
    name: String,
    prix: Number,
    monnaie: String
});
var menuModel = mongoose_1.model('Menu', menuSchema);
exports.createMenu = function (menuData) {
    var menu = new menuModel(menuData);
    return menu.save();
};
exports.deleteMenu = function (menuID) {
    menuModel.deleteOne({ _id: menuID }, function (err) {
        if (err)
            return console.log(err);
    });
};
exports["default"] = menuModel;
