const jwt = require("jsonwebtoken");
require('dotenv').config()

exports.verifyToken = (cookie, role) => {
    let response;
    if(cookie.token)
    {
        jwt.verify(cookie.token, process.env.JWT_KEY, function(err, decoded) {
            if(err) {
                response = false
            }
            else if (parseInt(decoded.role) === role) {
                response = true
            }
            else {
                response = false
            }
        });
    }
    else {
        response = false
    }
    return response;
}

exports.verifyTokenLogin = (cookie) => {
    let response;
    let userData = {};
    if(cookie.token)
    {
        jwt.verify(cookie.token, process.env.JWT_KEY, function(err, decoded) {
            if(err){
                response = false
            }
            else {
                response = true
                userData = {
                    uid: decoded.uid,
                    role: decoded.role
                }
            }
        });
    }
    else {
        response = false
    }
    return { response: response, userData: userData };
}

exports.createToken = (uid, role) => {
    return jwt.sign({uid: uid, role: role}, process.env.JWT_KEY, { expiresIn: '24h' })
}
