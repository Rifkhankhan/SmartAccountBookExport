const router = require('express').Router()
const {
	CreateRequest,
	getRequest,
	getRequests,
	updateRequest,
	ToggleRequest,
	importRequests,
	getActors
} = require('../Controllers/AccountRequestController')
const { admin, protect } = require('./../Middleware/authMiddlewate.js')
const path = require('path')
const express = require('express')
const multer = require('multer')

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, 'uploads/')
	},
	filename(req, file, cb) {
		cb(
			null,
			`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
		)
	}
})

function checkFileType(file, cb) {
	const filetypes = /jpg|jpeg|png/
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase())

	const mimetype = filetypes.test(file.mimetype)

	if (extname && mimetype) {
		return cb(null, true)
	} else {
		cb('Image only!')
	}
}

const upload = multer({
	storage
})

// add new request
router.post('/', upload.single('file'), protect, CreateRequest)

// gets
router.get('/', protect, getRequests)

// update
router.put('/:id', upload.single('file'), protect, updateRequest)

// ToggleDisable
router.put('/disable/:id', protect, ToggleRequest)

// get product
router.get('/:id', protect, getRequest)
router.post('/import', importRequests)
module.exports = router
