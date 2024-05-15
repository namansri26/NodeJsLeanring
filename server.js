const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const { error } = require('console')
const dotenv = require('dotenv')
dotenv.config()
const EmployeeRoute = require('./routes/employeeroutes')
const AuthROute= require('./routes/authroute')




mongoose.connect('mongodb://localhost:27017/testdb' ,
 {useNewUrlParser:  true , useUnifiedTopology : true})

const db = mongoose.connection

db.on(error , (err)=>{
    console.log(err)
})

db.once('open' , ()=>{
    console.log('database Connection Established')
})


const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('uploads', express.static('uploads'))

const PORT = process.env.PORT || 3000

app.listen(PORT ,  ()=>{
    console.log('Server is a running on port ${PORT}')
    
})

app.use('/api/employee' , EmployeeRoute)
app.use('/api' , AuthROute)




