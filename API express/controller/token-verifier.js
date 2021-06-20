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

exports.createToken = () => {

}
