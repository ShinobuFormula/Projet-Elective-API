const { Model, DataTypes } = require('sequelize');
import sequelize from '../../mysql.db';


const Sponsorship = sequelize.define('Sponsorship', {
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
    sequelize,
    modelName: 'Sponsorship',
    tableName: 'sponsorship',
    timestamps: false
});

exports.getAllSponsorship = async () => {
    const sponsorships = await Sponsorship.findAll();
    return sponsorships
}

exports.createSponsorship = async (body:JSON) => {
    const sponsorship = await Sponsorship.create(body);
    const response = await sponsorship.save()
    return response
}