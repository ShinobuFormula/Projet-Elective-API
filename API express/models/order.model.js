"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    cid: {
        type: Number,
        required: true
    },
    did: {
        type: Number,
        required: false,
        default: 0
    },
    delivered: {
        type: Boolean,
        required: false,
        default: false
    },
    content: {
        type: Array,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    orderedAt: {
        type: Date,
        default: Date.now()
    },
    deliveredAt: {
        type: Date
    }
});
const orderModel = mongoose_1.model('Order', orderSchema);
exports.getAllOrders = async () => {
    const orders = await orderModel.find();
    return orders;
};
exports.getAllOrdersbyCustomer = async (cid) => {
    const orders = await orderModel.find({ cid: cid });
    return orders;
};
exports.getOneOrder = async (req) => {
    const order = await orderModel.findOne({ _id: req.params.id }, 'content uid price');
    return order;
};
exports.createOrder = (orderData) => {
    orderData['orderedAt'] = Date.now();
    orderData['deliveredAt'] = null;
    const order = new orderModel(orderData);
    return order.save();
};
exports.updateOneOrder = async (req) => {
    const order = await orderModel.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true
    });
    order.save();
};
exports.acceptOrder = async (orderID, UID) => {
    const order = await orderModel.findOneAndUpdate({ _id: orderID }, { did: UID }, {
        new: true
    });
    order.save();
};
exports.deliverOrder = async (orderID) => {
    const order = await orderModel.findOneAndUpdate({ _id: orderID }, { delivered: true, deliveredAt: Date.now() }, {
        new: true
    });
    order.save();
};
exports.deleteOrder = (orderID) => {
    orderModel.deleteOne({ _id: orderID }, function (err) {
        if (err)
            return console.log(err);
    });
};
exports.default = orderModel;
