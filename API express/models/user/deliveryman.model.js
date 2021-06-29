"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { Model, DataTypes } = require('sequelize');
const mysql_db_1 = __importDefault(require("../../mysql.db"));
const Deliveryman = mysql_db_1.default.define('Deliveryman', {
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING
    },
    IBAN: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize: mysql_db_1.default,
    modelName: 'Deliveryman',
    tableName: 'delivery_man',
    timestamps: false
});
exports.getAllDeliveryman = async () => {
    const deliverymans = await Deliveryman.findAll();
    return deliverymans;
};
exports.getDeliveryman = async (uid) => {
    const deliveryman = await Deliveryman.findAll({
        where: {
            id: uid
        },
        attributes: { exclude: ['password'] }
    });
    return deliveryman;
};
exports.getDeliverymanbyEmail = async (email) => {
    const deliveryman = await Deliveryman.findAll({
        where: {
            email: email
        },
        attributes: { exclude: ['password'] }
    });
    return deliveryman;
};
exports.createDeliveryman = async (body) => {
    const deliveryman = await Deliveryman.create(body);
    const response = await deliveryman.save();
    return response;
};
exports.updateDeliveryman = async (body, uid) => {
    const deliveryman = await Deliveryman.findAll({
        where: {
            id: uid
        },
    });
    if (body.email) {
        deliveryman[0].email = body.email;
    }
    if (body.firstname) {
        deliveryman[0].firstname = body.firstname;
    }
    if (body.lastname) {
        deliveryman[0].lastname = body.lastname;
    }
    if (body.IBAN) {
        deliveryman[0].IBAN = body.IBAN;
    }
    const response = await deliveryman[0].save();
    return response;
};
exports.deleteDeliveryman = async (uid) => {
    const deliveryman = await Deliveryman.destroy({
        where: {
            id: uid
        }
    });
    return deliveryman;
};
exports.loginDeliveryman = async (email, password) => {
    const deliveryman = await Deliveryman.findAll({
        where: {
            email: email,
            password: password
        },
        attributes: { exclude: ['password'] }
    });
    return deliveryman;
};
