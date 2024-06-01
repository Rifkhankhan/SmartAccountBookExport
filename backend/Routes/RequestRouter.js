const router = require('express').Router()
const { getRequests, resetData } = require('../Controllers/RequestController')

// gets
router.get('/', getRequests)
router.post('/resetData', resetData)
module.exports = router
