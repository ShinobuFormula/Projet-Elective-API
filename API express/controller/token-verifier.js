const jwt = require("jsonwebtoken");

exports.verifyToken = (cookie, role) => {
    if(cookie.token)
    {
        jwt.verify(cookie.token, 'your-256-bit-secret', function(err, decoded) {
            if(err) {
                return false
            }
            else if (decoded.role === role) {
                return true
            }
            else {
                return false;
            }
        });
    }
    else {
        return false
    }
}
