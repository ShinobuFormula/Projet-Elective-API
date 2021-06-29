const { Model, DataTypes } = require('sequelize');
import sequelize from '../../mysql.db';


const Restaurant = sequelize.define('Restaurant', {
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
    sequelize,
    modelName: 'Restaurant',
    tableName: 'restaurant',
    timestamps: false
});

exports.getAllRestaurant = async () => {
    const restaurants = await Restaurant.findAll();
    return restaurants
}

exports.getRestaurant = async (uid:number) => {
    const restaurant = await Restaurant.findAll({
        where: {
            id: uid
        },
        attributes: { exclude: ['password'] }
    });
    return restaurant
}

exports.getRestaurantbyEmail = async (email:string) => {
    const restaurant = await Restaurant.findAll({
        where: {
            email: email
        },
        attributes: { exclude: ['password'] }
    });
    return restaurant
}

exports.createRestaurant = async (body:JSON) => {
    const restaurant = await Restaurant.create(body);
    const response = await restaurant.save()
    return response
}

exports.updateRestaurant = async (body:any, uid:number) => {
    const restaurant = await Restaurant.findAll({
        where: {
            id: uid
        },
    });
    if(body.email)
    {
        restaurant[0].email = body.email
    }
    if(body.name)
    {
        restaurant[0].name = body.name
    }
    if(body.address)
    {
        restaurant[0].address = body.address
    }
    const response = await restaurant[0].save()

    return response;
}

exports.deleteRestaurant = async (uid:number) => {
    const restaurant = await Restaurant.destroy({
        where: {
            id: uid
        }
    });
    return restaurant
}

exports.loginRestaurant = async (email:string, password:string) => {
    const restaurant = await Restaurant.findAll({
        where: {
            email: email,
            password: password
        },
        attributes: { exclude: ['password'] }
    });
    return restaurant
}

exports.getRestaurantCount = async () => {
    const count = await Restaurant.count()
    return count
}