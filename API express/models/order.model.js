"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var orderSchema = new mongoose_1.Schema({
    uid: Number,
    price: Number,
    content: Array
});
var orderModel = mongoose_1.model('Order', orderSchema);
exports.getAllOrder = function () {
    orderModel.find(function (err, order) {
        if (err)
            return err;
        else
            return order;
    });
};
exports.createOrder = function (orderData) {
    var order = new orderModel(orderData);
    return order.save();
};
exports.AcceptOrder = function (orderID, UID) {
    orderModel.updateOne({ _id: orderID }, { deliveredBy: UID });
};
exports.deleteOrder = function (orderID) {
    orderModel.deleteOne({ _id: orderID }, function (err) {
        if (err)
            return console.log(err);
    });
};
exports["default"] = orderModel;
