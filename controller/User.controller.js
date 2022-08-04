const userModel = require('../model/User.model')
const bcrypt = require('bcrypt')
const user = require('../model/User.model')
const generateToken = require('../util/generateToken')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const register = async (req,res)=>{
    
    try{
        const firstname = req.body.firstname
        const lastname = req.body.lastname
        const email = req.body.email
        const encryptPassword = await bcrypt.hash(req.body.password,10)
        const date = Date.now()

        //email check if exist
        const emailExist = await userModel.findOne({
            email:email
        })

        if(emailExist){
           return res.status(409).json({
                message:"email is already taken!"
            })
        }

        const user =  new userModel({
            firstname:firstname,
            lastname:lastname,
            email:email,
            password:encryptPassword,
            date:date
        })

        await user.save()

        res.status(201).json({
            message:"succefully register!"
        })

    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }
}

const login = async (req,res) => {
    try{
        const email = req.body.email
        const password = req.body.password
        
        const userCheck = await userModel.findOne({
            email:email
        })

        if(!userCheck){
            return res.status(200).json({
                message:"email not found"
            })
        }
        const passwordMatch = await bcrypt.compare(password,userCheck.password)
        if(!passwordMatch){
            return res.status(200).json({
                message:"invalid email & password"
            })
        }

        const payload = {
            id:userCheck._id,
            firstname:userCheck.firstname,
            lastname:userCheck.lastname,
            email:userCheck.email
        }
        
        res.status(200).json({
            success:true,
            id:userCheck._id,
            firstname:userCheck.firstname,
            lastname:userCheck.lastname,
            email:userCheck.email,
            token:generateToken(payload)
        })

    
    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }
}

const dashboard = async (req,res) => {

    try{
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        
        const decode = jwt.verify(token,process.env.SECRET)
        
        if(!decode){
            return res.status(302).json({
                message:"error token"
            })
        }

        const userInfo = await userModel.findOne({
            _id:decode.id
        })
        
        res.status(200).json({
            id:userInfo._id,
            firstname:userInfo.firstname,
            lastname:userInfo.lastname,
            email:userInfo.email
        })
    }catch(err){
        console.log(err.message)
    }

}
module.exports = {
    register,
    login,
    dashboard
}