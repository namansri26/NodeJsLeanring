const { response } = require('express')
const Employee = require('../models/EmployeeModel')
const { error } = require('console')


// show the list of employee
const index = (req, res, next)=>{
    Employee.find().then(response=>{
          res.json({
            total : response.length , 
            response 
           
        })
    })
    .catch(error=>{
        res.json({
            message: 'An error occured !!'
        })
    })


}
// show only one employee
const show = (req, res, next)=>{
      let employeeID = req.body.employeeID
      Employee.findById(employeeID)
      .then(response =>{
                 res.json({
                    response
                 })

      })
      .catch(error =>{
        res.json({
            message: 'An error occured !!'
        })
      })


}


// ADD employee in db

const store = (req, res, next)=>{            
    let employee = new Employee({
            name: req.body.name,
            designation: req.body.designation,
            email: req.body.email,
            phone: req.body.phone,
            age: req.body.age

    })
    if(req.file){
       employee.avatar = req.file.path
    }
    employee.save()
        .then(response =>{
            res.json({
                message: 'Employee added succussfully'
            })
        })
        .catch(error =>{
            res.json({
                message: 'An error occured'
            })

        })


}


// update

const update = (req, res, next) =>{
    let employeeID = req.body.employeeID
    let updatedData ={
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    }

    Employee.findByIdAndUpdate(employeeID, {$set: updatedData})
    .then(()=>{
        res.json({
            message: 'Employee updated succussfully'
        })


    })
    .catch(error =>{
        res.json({
            message: 'An error occured'
        })
    })
}



// delete the employeee

const deleteEmployee = (req, res, next)=>{
   
    let employeeID = req.body.employeeID
    Employee.findOneAndDelete(employeeID)
    .then(()=>{
        res.json({
            message: 'Employee deleted succussfully'
        })
    })
    .catch(error =>{
        res.json({
            message: 'An error occured'
        })
    })

}



module.exports = {
    index, show, store, update, deleteEmployee
}

