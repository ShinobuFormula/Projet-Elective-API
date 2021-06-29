"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { Model, DataTypes } = require('sequelize');
const mysql_db_1 = __importDefault(require("../../mysql.db"));
const Customer = mysql_db_1.default.define('Customer', {
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
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize: mysql_db_1.default,
    modelName: 'Customer',
    tableName: 'customer',
    timestamps: false
});
exports.getAllCustomer = async () => {
    const customers = await Customer.findAll();
    return customers;
};
exports.getCustomer = async (uid) => {
    const customer = await Customer.findAll({
        where: {
            id: uid
        },
        attributes: { exclude: ['password'] }
    });
    return customer;
};
exports.getCustomerbyEmail = async (email) => {
    const customer = await Customer.findAll({
        where: {
            email: email
        },
        attributes: { exclude: ['password'] }
    });
    return customer;
};
exports.createCustomer = async (body) => {
    const customer = await Customer.create(body);
    const response = await customer.save();
    return response;
};
exports.updateCustomer = async (body, uid) => {
    const customer = await Customer.findAll({
        where: {
            id: uid
        },
    });
    if (body.email) {
        customer[0].email = body.email;
    }
    if (body.firstname) {
        customer[0].firstname = body.firstname;
    }
    if (body.lastname) {
        customer[0].lastname = body.lastname;
    }
    if (body.address) {
        customer[0].address = body.address;
    }
    const response = await customer[0].save();
    return response;
};
exports.deleteCustomer = async (uid) => {
    const customer = await Customer.destroy({
        where: {
            id: uid
        }
    });
    return customer;
};
exports.loginCustomer = async (email, password) => {
    const customer = await Customer.findAll({
        where: {
            email: email,
            password: password
        },
        attributes: { exclude: ['password'] }
    });
    return customer;
};
