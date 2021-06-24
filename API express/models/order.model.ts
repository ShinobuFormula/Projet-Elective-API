import {Schema, model} from 'mongoose';

interface OrderModel {
    cid: number,
    did: number
    delivered : boolean,
    content: string[],
    price: number,
    date: Date
}

const orderSchema = new Schema<OrderModel>({
    cid: {
        type :Number,
        required: true
    },
    did: {
        type :Number,
        required: true
    },
    delivered: {
        type :Boolean,
        required: true
    },
    content: {
        type :Array,
        required: true
    },
    price: {
        type :Number,
        required: true
    },
    date: {
        type: Date
    }
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

exports.updateOneOrder = async (req:any) => {
    const order = await orderModel.findOneAndUpdate({_id: req.params.id}, req.body, {
        new: true
    });
    order.save();
}

exports.acceptOrder = async (orderID:any, UID: any) => {
    const order = await orderModel.findOneAndUpdate({_id: orderID}, {did: UID}, {
        new: true
    });
    order.save();
}

exports.deliverOrder = async (orderID:any) => {
    const order = await orderModel.findOneAndUpdate({_id: orderID}, {delivered: true}, {
        new: true
    });
    order.save();
}

exports.deleteOrder = (orderID:any) => {
    orderModel.deleteOne({_id:orderID}, function (err){
        if (err) return console.log(err)
    })
};

export default orderModel;
