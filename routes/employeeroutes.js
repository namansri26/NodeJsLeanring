const express = require('express')
const router = express.Router()

const EmployeeController = require('../controllers/EmployeeControllers')
const authenticate = require('../middleware/authenticate')

const upload = require('../middleware/upload')
router.get('/' , authenticate,  EmployeeController.index)
router.post('/show', authenticate,  EmployeeController.show)
router.post('/store', authenticate, upload.single('avatar'),  EmployeeController.store)
router.post('/update', authenticate,  EmployeeController.update)
router.post('/delete', authenticate, EmployeeController.deleteEmployee)
module.exports = router







