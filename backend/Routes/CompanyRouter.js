const router = require('express').Router()
const {
	CreateCompany,
	getcompanies,
	getUserComponies
} = require('../Controllers/CompanyController')
const { protect, admin } = require('../Middleware/authMiddlewate')

// add new request
router.post('/', protect, admin, CreateCompany)

// gets
router.get('/', protect, getcompanies)
// router.put('/:id', protect, admin, updateUserCompanies)
router.get('/:id', protect, getUserComponies)

module.exports = router
