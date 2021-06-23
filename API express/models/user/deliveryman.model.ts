const { Model, DataTypes } = require('sequelize');
import sequelize from '../../mysql.db';


const Deliveryman = sequelize.define('Deliveryman', {
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
    sequelize,
    modelName: 'Deliveryman',
    tableName: 'delivery_man',
    timestamps: false
});

exports.getAllDeliveryman = async () => {
    const deliverymans = await Deliveryman.findAll();
    return deliverymans
}

exports.getDeliveryman = async (uid:number) => {
    const deliveryman = await Deliveryman.findAll({
        where: {
            id: uid
        }
    });
    return deliveryman
}

exports.createDeliveryman = async (body:JSON) => {
    const deliveryman = await Deliveryman.create(body);
    const response = await deliveryman.save()
    //return deliverymans
}

exports.deleteDeliveryman = async (uid:number) => {
    const deliveryman = await Deliveryman.destroy({
        where: {
            id: uid
        }
    });
    return deliveryman
}

exports.loginDeliveryman = async (email:string, password:string) => {
    const deliveryman = await Deliveryman.findAll({
        where: {
            email: email,
            password: password
        },
        attributes: { exclude: ['password'] }
    });
    return deliveryman
}