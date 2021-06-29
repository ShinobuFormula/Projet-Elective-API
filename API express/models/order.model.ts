import {Schema, model} from 'mongoose';

interface OrderModel {
    cid: number,
    did: number
    delivered : boolean,
    content: string[],
    price: number,
    date: number
}

const orderSchema = new Schema<OrderModel>({
    cid: {
        type :Number,
        required: true
    },
    did: {
        type :Number,
        required: false,
        default: 0
    },
    delivered: {
        type :Boolean,
        required: false,
        default: false
    },
    content: {
        type :Array,
        required: true
    },
    price: {
        type :Number,
        required: true
    },
    orderedAt: {
        type: Date,
        default: Date.now()
    },
    deliveredAt: {
        type: Date
    }
})

const orderModel = model('Order', orderSchema)

exports.getAllOrders = async () => {
    const orders = await orderModel.find();
    return orders;
}

exports.getAllOrdersbyCustomer = async (cid:number) => {
    const orders = await orderModel.find( {cid: cid});
    return orders;
}

exports.getOneOrder = async (req:any) => {
    const order = await orderModel.findOne( {_id: req.params.id}, 'content uid price')
    return order
}

exports.createOrder = (orderData:any) => {
    orderData['orderedAt'] = Date.now()
    orderData['deliveredAt'] = null
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
    const order = await orderModel.findOneAndUpdate({_id: orderID}, {delivered: true, deliveredAt: Date.now()}, {
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
