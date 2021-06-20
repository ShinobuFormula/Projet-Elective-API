import {Schema, model} from 'mongoose';
import articleModel from "./article.model";

interface OrderModel {
    uid: number,
    price: number,
    content: string[]
}

const orderSchema = new Schema<OrderModel>({
    uid: Number,
    price: Number,
    content: Array
})

const orderModel = model('Order', orderSchema)

exports.getAllOrders = async () => {
    const orders = await orderModel.find();
    return orders;
}

exports.getOneOrder = async (req:any) => {
    const order = await orderModel.findOne( {_id: req.params.id}, 'content uid price')
    return order
}

exports.createOrder = (orderData:JSON) => {
    const order = new orderModel(orderData);
    return order.save();
};

exports.AcceptOrder = (orderID:any, UID: any) => {
    orderModel.updateOne({_id:orderID}, { deliveredBy: UID });
}

exports.deleteOrder = (orderID:any) => {
    orderModel.deleteOne({_id:orderID}, function (err){
        if (err) return console.log(err)
    })
};

export default orderModel;
