const { Model, DataTypes } = require('sequelize');
import sequelize from '../../mysql.db';


const Log = sequelize.define('Log', {
    userID: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    connectedAt: {
        type: Date,
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

exports.createLog = async (body:JSON) => {
    const log = await Log.create(body);
    const response = await log.save()
    return response
}