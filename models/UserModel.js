const { timeStamp } = require('console')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type: String
    },
    email:{
          type: String
    },
    phone:{
        type: String
    },
    password: {
        type: String
    }
}, { timeStamp :true})



const User = mongoose.model('UserModel' , userSchema)
module.exports = User