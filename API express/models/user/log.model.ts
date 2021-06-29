import {logger} from "sequelize/types/lib/utils/logger";

const { Model, DataTypes } = require('sequelize');
import sequelize from '../../mysql.db';


const Log = sequelize.define('Log', {
    userID: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    connectedAt: {
        type: DataTypes.DATE,
        default: Date.now()
    },
    role: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'Log',
    tableName: 'log',
    timestamps: false
});

exports.getAllLog = async () => {
    const logs = await Log.findAll();
    return logs
}

exports.createLog = async (logData:any) => {
    logData['connectedAt'] = Date.now()
    const log = await Log.create(logData);
    const response = await log.save()
    return response
}

exports.deleteLog = async (lid:number) => {
    const log = await Log.destroy({
        where: {
            id: lid
        }
    });
    return log
}