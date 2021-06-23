const jwt = require("jsonwebtoken");

exports.verifyToken = (cookie, role) => {
    let response;
    if(cookie.token)
    {
        jwt.verify(cookie.token, 'your-256-bit-secret', function(err, decoded) {
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
        jwt.verify(cookie.token, 'your-256-bit-secret', function(err, decoded) {
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
    return jwt.sign({uid: uid, role: role}, 'your-256-bit-secret', { expiresIn: '24h' })
}
