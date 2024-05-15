const mongoose = require('mongoose')
const schema = mongoose.Schema

const mongoosePagination = require('mongoose-paginate-v2')

const employeeSchema = new mongoose.Schema({
       name:{
        type : String 
    },
    designation:{
      type: String
    },
    email:{
        type: String
      },
      phone:{
        type: String
      },
      age:{
        type: Number
      },

      avatar:{
        type :String
      }
}, {timestamps: true})


 
employeeSchema.plugin(mongoosePagination)
const Employee = mongoose.model('EmployeeModel' , employeeSchema)
module.exports = Employee
