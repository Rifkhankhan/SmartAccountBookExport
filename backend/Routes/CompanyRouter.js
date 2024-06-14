const router = require('express').Router()
const {
	CreateCompany,
	getcompanies,
	getUserComponies
} = require('../Controllers/CompanyController')

// add new request
router.post('/', CreateCompany)

// gets
router.get('/', getcompanies)
router.get('/:id', getUserComponies)

module.exports = router
