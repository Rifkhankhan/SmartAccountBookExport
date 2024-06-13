const router = require('express').Router()
const {
	usersignin,

	uploadProfilePhoto,
	// adminSignIn,
	updateUser,
	getUserData,

	createCustomer,
	getCustomers,
	updateCustomer,
	autoLogin,
	Activation,
	resetUserPassword,
	updatePassword,
	logout,
	getUserActivities,
	logoutUserAccount
} = require('../Controllers/usercontroller.js')

const { admin, protect } = require('../Middleware/authMiddlewate.js')

// get user
router.post('/createUser', protect, createCustomer)
router.post('/autoLogin', protect, autoLogin)
router.post('/signin', usersignin)
router.post('/logout', protect, logout)
router.put('/logoutUserAccount/:id', protect, admin, logoutUserAccount)
router.get('/', protect, admin, getCustomers)
router.get('/activities', protect, admin, getUserActivities)
router.put('/:id', protect, admin, updateCustomer)
router.put('/reset/:id', protect, admin, resetUserPassword)
router.put('/updatePassword/:id', protect, updatePassword)

// get user by token

// user sign in
router.put('/activate/:id', protect, admin, Activation)

// upload profile image

// user update profile
// router.put('/:id', updateUser);

// // forgot password
// router.post("/forgot-password", forgotPassword)
// router.put('/reset-password/:resetPasswordToken', resetPassword);

module.exports = router
