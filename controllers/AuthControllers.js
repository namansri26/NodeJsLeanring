const UserModel = require('../models/UserModel')
const bcrypt = require('bcryptjs')
const { log } = require('console')
const jwt = require('jsonwebtoken')

const  register = (req, res, next)=>{
   // bcrypt.hash(req.body.password, 10, function(err , hashedPass){
       // if(err){
         //      res.json({
           //      error: err
             //  })
        //}
        let user = new UserModel({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password
            })
    
            user.save()
            .then(()=>{
                res.json({
                    message: 'User Added succussfully'
                })
        
        
            })
            .catch(error =>{
                res.json({
                    message: 'An error occured'
                })
            })
   // })
}


 const login = async (req, res, next)=>{
   var username = req.body.username 
   var password = req.body.password

   await UserModel.findOne
   ({$or : [{email:username}, { phone:username}] })
   .then(user=>{
    console.log(user)
    if(user!=null){
        try{
              console.log(password)
              console.log(process.env.ACCESS_TOKEN_SECRET)
              
                if(password==user.password){
                    let token = jwt.sign({name: user.username}, 
                        process.env.ACCESS_TOKEN_SECRET, 
                        {expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME})
                    let refreshToken = jwt.sign({name: user.username}, 
                         process.env.REFRESH_TOKEN_SECRET,
                          {expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME})
                        return res.json({
                            message:  'Login Successfull!!',
                            token ,
                            refreshToken
                        })
                }else{
                    return res.json({
                            message:  'Password incorrect !!',
                           
                        })
                }
            
           // })        
        }
        catch(error){
            return res.json({
                error: error
            })
        }
    
    }else{
       return res.json({
            message: 'User not found'
        })
    }
   })
}


const refreshToken = (req, res, next)=>{
    const refreshToken = req.body.refreshToken
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, function (err, decode){
            if(err){
                res.status(400).json({
                    err
                })
            }else{
                let token = jwt.sign({name: decode.name} ,  process.env.ACCESS_TOKEN_SECRET ,
                     {expiresIn:  process.env.ACCESS_TOKEN_EXPIRE_TIME} )
                let refreshToken = req.body.refreshToken
                return res.status(200).json({
                    message:  'Login refreshed Successfull!!',
                    token ,
                    refreshToken
                })

            }

    }) 



}
module.exports = {
    register, login , refreshToken
}