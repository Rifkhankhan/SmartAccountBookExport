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

// get user
router.post('/createUser', createCustomer)
router.post('/autoLogin/:token', autoLogin)
router.post('/signin', usersignin)
router.post('/logout/:token', logout)
router.put('/logoutUserAccount/:id', logoutUserAccount)
router.get('/', getCustomers)
router.get('/activities', getUserActivities)
router.put('/:id', updateCustomer)
router.put('/reset/:id', resetUserPassword)
router.put('/updatePassword/:id', updatePassword)

// get user by token

// user sign in
router.put('/activate/:id', Activation)

// upload profile image

// user update profile
// router.put('/:id', updateUser);

// // forgot password
// router.post("/forgot-password", forgotPassword)
// router.put('/reset-password/:resetPasswordToken', resetPassword);

module.exports = router
