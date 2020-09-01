const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User');
const config = require('config');
const auth = require('./middleware/auth')
const { check, validationResult } = require('express-validator');


// @route    GET api/auth
// @desc     Get logged in user
// @access   Private

router.get('/', auth, async (req, res) => {
    try {
        // search MongoDB model for the req.user.id (added by the database upon creation), 
        // and making sure we don't get the password (in database, the password key) in the response
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

// @route    POST api/auth
// @desc     Authenticate user and get token
// @access   Public

router.post('/', [
    check('email', "Please include a valid email").isEmail(),
    check('password', 'Password is required').exists()
], 
async (req, res) => {
    const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
    
    const { email, password } = req.body

    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials'})
        }

        // declare isMatch to find if the password we got matches the password in the database
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials'})
        }

        // Sending user id in payload
        const payload = {
            user: {
                id: user.id
            }
        }

        // on sign in, grab the secret from config file
        jwt.sign(payload, config.get('jwtSecret'), {
            // session timeout after 1 hour
            expiresIn: 3600
        }, (err, token) => {
            if(err) throw err
            res.json({ token })
        })

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
}

);

module.exports = router;