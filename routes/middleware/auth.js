const jwt = require('jsonwebtoken')
const config = require('config')

// This will pertain to protected routes

module.exports = function(req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token')

    // Check if not token
    if(!token) {
        // throw 401 unauthorized error
        return res.status(401).json({ msg: "No token, authorization denied" })
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'))

        // set the user in request payload as the user from the decoded stuff from above
        req.user = decoded.user
        next()
        // if it doesn't varify, we will throw a 401 unauth error
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' })
    }
}