const { response } = require('express')
const Employee = require('../models/EmployeeModel')
const UserRole = require('../models/UserRoles')
const { error } = require('console')
const csvtojson = require('csvtojson');
const upload = require('../middleware/upload')

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

// show the list of employee
const indexPagination = (req, res, next)=>{
    Employee.paginate({}, {page: req.query.page , limit: req.query.limit})
    .then(EmployeeData =>{
        res.json({
            EmployeeData
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

const uploadExcel = async (req,res, next)=>{
    try {
        console.log(req.file)
        if (!req.file) {
          return res.status(400).json({ message: 'No file uploaded!' });
        }
         
        console.log("path of file-::::", req.file.path)
        // Read the uploaded Excel file and convert to JSON
        const jsonData = await csvtojson({ // Use файланализ option for correct Russian parsing
          delimiter: ',', // Adjust delimiter if needed
          includeColumns: [ // Specify column names to map to User model properties (if different)
            'name',
            'email'
            // ... other user properties
          ],
        }).fromFile(req.file.path);
    
        // Validate data before insertion (optional)
        const validUsers = jsonData.filter(user => {
          // Implement validation logic for required fields, data types, etc.
          console.log(user.name)
          return user.name && user.email;
        });
    
        // Create users in bulk using Mongoose insertMany
        await Employee.insertMany(validUsers);
    
        res.status(201).json({ message: 'Users created successfully!' });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating users!' });
      } finally {
       
      }

}


const newExample = new UserRole({
    name: 'Sample name',
    status: 'approved'

})

newExample.save().then(res=>{
    console.log('added succussfully')
})
.catch(error=>{
    console.log('error coming for enum')
    console.log("Error-------     ", error)
})





module.exports = {
    indexPagination, show, store, update, deleteEmployee , uploadExcel
}

