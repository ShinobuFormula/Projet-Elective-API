import {Schema, model} from 'mongoose';

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

exports.getAllOrder = () => {
    let response: any
    orderModel.find( (err, order) => {
        if(err) response = err
        else response = order
    })
    return response
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