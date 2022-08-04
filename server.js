const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')


//middleware
app.use(cors())

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));


//apiAuth
const userAuthRoute = require('./route/User.route')
app.use('/',userAuthRoute)

//mongodb fireup
const mongoUri = process.env.MONGO_URI
mongoose.connect(mongoUri)
.then(()=>{
    console.log('database connected!')
})
.catch((err)=>{
    console.log(err.message)
})


//server fireup
const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`server is runnning on port ${PORT}...`)
})