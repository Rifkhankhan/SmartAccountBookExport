const router = require('express').Router()
const { getRequests, resetData } = require('../Controllers/RequestController')
const { admin, protect } = require('./../Middleware/authMiddlewate.js')

// gets
router.get('/', protect, admin, getRequests)
router.post('/resetData', protect, admin, resetData)
module.exports = router
