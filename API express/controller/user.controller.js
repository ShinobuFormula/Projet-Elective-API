const Customer = require("../models/user/Customer.model");
const Restaurant = require("../models/user/Restaurant.model");
const Deliveryman = require("../models/user/Deliveryman.model");
const Salesperson = require("../models/user/Salesperson.model");
const Developer = require("../models/user/Developer.model");
const TokenController = require("../controller/token-verifier")

exports.createUser = (body, typeOfUser) => {
    switch (parseInt(typeOfUser)){
        case 1:
            Customer.createCustomer(body)
            break;
        case 2:
            Restaurant.createRestaurant(body)
            break;
        case 3:
            Deliveryman.createDeliveryman(body)
            break;
        case 4:
            Salesperson.createSalesperson(body)
            break;
        case 5:
            Developer.createDeveloper(body)
            break;
    }
}

exports.deleteUser = (uid, typeOfUser) => {
    switch (parseInt(typeOfUser)){
        case 1:
            Customer.deleteCustomer(uid)
            break;
        case 2:
            Restaurant.deleteRestaurant(uid)
            break;
        case 3:
            Deliveryman.deleteDeliveryman(uid)
            break;
        case 4:
            Salesperson.deleteSalesperson(uid)
            break;
        case 5:
            Developer.deleteDeveloper(uid)
            break;
    }
}

exports.getUser = async (uid, typeOfUser) => {
    let userData
    switch (parseInt(typeOfUser)){
        case 1:
            userData = await Customer.getCustomer(uid)
            break;
        case 2:
            userData = await Restaurant.getRestaurant(uid)
            break;
        case 3:
            userData = await Deliveryman.getDeliveryman(uid)
            break;
        case 4:
            userData = await Salesperson.getSalesperson(uid)
            break;
        case 5:
            userData = await Developer.getDeveloper(uid)
            break;
    }
    return userData[0].dataValues
}

exports.getAllUserByType = async (typeOfUser) => {
    let usersData
    switch (parseInt(typeOfUser)){
        case 1:
            usersData = await Customer.getAllCustomer()
            break;
        case 2:
            usersData = await Restaurant.getAllRestaurant()
            break;
        case 3:
            usersData = await Deliveryman.getAllDeliveryman()
            break;
        case 4:
            usersData = await Salesperson.getAllSalesperson()
            break;
        case 5:
            usersData = await Developer.getAllDeveloper()
            break;
    }
    return usersData
}

exports.loginUser = async (body, typeOfUser) => {
    let userData
    switch (parseInt(typeOfUser)){
        case 1:
            userData = await Customer.loginCustomer(body.email, body.password)
            break;
        case 2:
            userData = await Restaurant.loginRestaurant(body.email, body.password)
            break;
        case 3:
            userData = await Deliveryman.loginDeliveryman(body.email, body.password)
            break;
        case 4:
            userData = await Salesperson.loginSalesperson(body.email, body.password)
            break;
        case 5:
            userData = await Developer.loginDeveloper(body.email, body.password)
            break;
    }
    return {token: TokenController.createToken(userData[0].dataValues.id, parseInt(typeOfUser)), userData : userData}
}

exports.getAllUser = async () => {
    let usersData = []
    let temp

    temp = await Customer.getAllCustomer()
    temp.forEach(elem => {
        usersData.push(elem)
    })
    temp = await Restaurant.getAllRestaurant()
    temp.forEach(elem => {
        usersData.push(elem)
    })
    temp = await Deliveryman.getAllDeliveryman()
    temp.forEach(elem => {
        usersData.push(elem)
    })
    temp = await Salesperson.getAllSalesperson()
    temp.forEach(elem => {
        usersData.push(elem)
    })
    temp = await Developer.getAllDeveloper()
    temp.forEach(elem => {
        usersData.push(elem)
    })

    return usersData
}