const { Model, DataTypes } = require('sequelize');
import sequelize from '../../mysql.db';


const Developer = sequelize.define('Developer', {
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
}, {
    sequelize,
    modelName: 'Developer',
    tableName: 'developer',
    timestamps: false
});

exports.getAllDeveloper = async () => {
    const developers = await Developer.findAll();
    return developers
}

exports.getDeveloper = async (uid:number) => {
    const developer = await Developer.findAll({
        where: {
            id: uid
        }
    });
    return developer
}

exports.createDeveloper = async (body:JSON) => {
    const developer = await Developer.create(body);
    const response = await developer.save()
    //return developers
}

exports.deleteDeveloper = async (uid:number) => {
    const developer = await Developer.destroy({
        where: {
            id: uid
        }
    });
    return developer
}

exports.loginDeveloper = async (email:string, password:string) => {
    const developer = await Developer.findAll({
        where: {
            email: email,
            password: password
        },
        attributes: { exclude: ['password'] }
    });
    return developer
}