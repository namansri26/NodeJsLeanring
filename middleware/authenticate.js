const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) =>{
 try{            
    const token = req.headers.authorization.split(' ')[1]
    const decode = jwt.verify(token , 'secretValue')

    req.user = decode
    next()

 }
 catch(error){
    console.log("errorName  --- "+error.name)
    if(error.name  == "TokenExpiredError"){
        res.status(401).json({
            message: 'token expired !!'
          })
    }else{
        res.json({
            message: 'Authentication Failed !!'
          })
    }
      
 }

}


module.exports = authenticate