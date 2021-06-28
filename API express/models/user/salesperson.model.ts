const { Model, DataTypes } = require('sequelize');
import sequelize from '../../mysql.db';


const Salesperson = sequelize.define('Salesperson', {
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
    modelName: 'Salesperson',
    tableName: 'salesperson',
    timestamps: false
});

exports.getAllSalesperson = async () => {
    const salespersons = await Salesperson.findAll();
    return salespersons
}

exports.getSalesperson = async (uid:number) => {
    const salesperson = await Salesperson.findAll({
        where: {
            id: uid
        },
        attributes: { exclude: ['password'] }
    });
    return salesperson
}

exports.createSalesperson = async (body:JSON) => {
    const salesperson = await Salesperson.create(body);
    const response = await salesperson.save()
    return response
}

exports.updateSalesperson = async (body:any, uid:number) => {
    const salesperson = await Salesperson.findAll({
        where: {
            id: uid
        },
    });
    if(body.email)
    {
        salesperson[0].email = body.email
    }
    if(body.firstname)
    {
        salesperson[0].firstname = body.firstname
    }
    if(body.lastname)
    {
        salesperson[0].lastname = body.lastname
    }
    if(body.IBAN)
    {
        salesperson[0].IBAN = body.IBAN
    }
    const response = await salesperson[0].save()

    return response;
}

exports.deleteSalesperson = async (uid:number) => {
    const salesperson = await Salesperson.destroy({
        where: {
            id: uid
        }
    });
    return salesperson
}

exports.loginSalesperson = async (email:string, password:string) => {
    const salesperson = await Salesperson.findAll({
        where: {
            email: email,
            password: password
        },
        attributes: { exclude: ['password'] }
    });
    return salesperson
}