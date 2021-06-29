"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { Model, DataTypes } = require('sequelize');
const mysql_db_1 = __importDefault(require("../../mysql.db"));
const Restaurant = mysql_db_1.default.define('Restaurant', {
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize: mysql_db_1.default,
    modelName: 'Restaurant',
    tableName: 'restaurant',
    timestamps: false
});
exports.getAllRestaurant = async () => {
    const restaurants = await Restaurant.findAll();
    return restaurants;
};
exports.getRestaurant = async (uid) => {
    const restaurant = await Restaurant.findAll({
        where: {
            id: uid
        },
        attributes: { exclude: ['password'] }
    });
    return restaurant;
};
exports.getRestaurantbyEmail = async (email) => {
    const restaurant = await Restaurant.findAll({
        where: {
            email: email
        },
        attributes: { exclude: ['password'] }
    });
    return restaurant;
};
exports.createRestaurant = async (body) => {
    const restaurant = await Restaurant.create(body);
    const response = await restaurant.save();
    return response;
};
exports.updateRestaurant = async (body, uid) => {
    const restaurant = await Restaurant.findAll({
        where: {
            id: uid
        },
    });
    if (body.email) {
        restaurant[0].email = body.email;
    }
    if (body.name) {
        restaurant[0].name = body.name;
    }
    if (body.address) {
        restaurant[0].address = body.address;
    }
    const response = await restaurant[0].save();
    return response;
};
exports.deleteRestaurant = async (uid) => {
    const restaurant = await Restaurant.destroy({
        where: {
            id: uid
        }
    });
    return restaurant;
};
exports.loginRestaurant = async (email, password) => {
    const restaurant = await Restaurant.findAll({
        where: {
            email: email,
            password: password
        },
        attributes: { exclude: ['password'] }
    });
    return restaurant;
};
