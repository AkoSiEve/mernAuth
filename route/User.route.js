const express = require('express')
const route = express.Router()

const userAuthController = require('../controller/User.controller')
route.post('/register',userAuthController.register)
route.post('/login',userAuthController.login)
route.get('/dashboard',userAuthController.dashboard)

module.exports = route
