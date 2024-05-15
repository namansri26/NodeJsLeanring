const express = require('express')
const router = express.Router()

const UserControllers = require('../controllers/AuthControllers')
const authenticate = require('../middleware/authenticate')

router.post('/register' , UserControllers.register)
router.post('/login' , UserControllers.login)
router.post('/refresh-token' ,  UserControllers.refreshToken)

module.exports = router