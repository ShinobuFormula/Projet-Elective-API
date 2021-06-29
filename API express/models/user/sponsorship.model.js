"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { Model, DataTypes } = require('sequelize');
const mysql_db_1 = __importDefault(require("../../mysql.db"));
const Sponsorship = mysql_db_1.default.define('Sponsorship', {
    sponsor: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    sponsored: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    status: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
}, {
    sequelize: mysql_db_1.default,
    modelName: 'Sponsorship',
    tableName: 'sponsorship',
    timestamps: false
});
exports.getAllSponsorship = async () => {
    const sponsorships = await Sponsorship.findAll();
    return sponsorships;
};
exports.createSponsorship = async (body) => {
    const sponsorship = await Sponsorship.create(body);
    const response = await sponsorship.save();
    return response;
};
