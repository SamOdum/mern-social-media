const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, cb) {
    //Get token from request header
    const token = req.header("x-auth-token");

    // Verify token exists
    // If not, deny access
    if (!token) {
        return res.status(401).json({ msg: "No token. Authorization denied!" }); // 401 = "Not Authorized"
    }

    // ...else, verify and continue
    try {
        const decoded = jwt.verify(token, config.get("jwtToken"));
        req.user = decoded.user;
        cb();
    } catch (error) {
        res.status(401).json({ msg: "Token is invalid." }); // verification failed? authorization deny : success!
    }
}