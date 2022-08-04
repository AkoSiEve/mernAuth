const jwt = require('jsonwebtoken')
require('dotenv').config()

const generateToken = (payload) =>{
    const token = jwt.sign(payload,process.env.SECRET,{expiresIn: '24h'})
    return token
}

module.exports = generateToken