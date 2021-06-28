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
        },
        attributes: { exclude: ['password'] }
    });
    return developer
}

exports.createDeveloper = async (body:JSON) => {
    const developer = await Developer.create(body);
    const response = await developer.save()
    return response
}

exports.updateDeveloper = async (body:any, uid:number) => {
    const developer = await Developer.findAll({
        where: {
            id: uid
        },
    });
    if(body.email)
    {
        developer[0].email = body.email
    }
    if(body.firstname)
    {
        developer[0].firstname = body.firstname
    }
    if(body.lastname)
    {
        developer[0].lastname = body.lastname
    }
    const response = await developer[0].save()

    return response;
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