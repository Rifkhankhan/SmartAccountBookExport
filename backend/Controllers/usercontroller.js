const bcrypt = require('bcrypt')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const asyncHandler = require('../Middleware/asyncHandler')
const generateToken = require('./../Utils/generateToken')
const { CreateCompany } = require('./CompanyController')

// Return "https" URLs by setting secure: true

const pool = require('../MysqlConnection')

// user sign in controller
exports.usersignin = asyncHandler(async (req, res) => {
	const { name, password } = req.body

	// Check if email and password is provided
	if (!name || !password) {
		return res
			.status(400)
			.json({ message: 'Please provide an email and password' })
	}

	try {
		// finding user by email

		const [user] = await pool.query('select * from users where name = ?', [
			req.body.name
		])

		// if user doesn't exist
		if (!user.length) {
			return res.status(404).json({ message: 'User not found' })
		}

		if (user[0].isLoggedIn) {
			return res.status(409).json({ message: 'User Already Logged in' })
		}

		// compare the provided password with the password in the database
		const ispasswordCorrect = await bcrypt.compare(password, user[0].password)

		// if passwords don't match
		if (!ispasswordCorrect) {
			return res.status(409).json({ message: 'Invalid credentials' })
		}

		if (!user[0].status) {
			return res.status(408).json({ message: 'User access denied!' })
		}

		// update loggin status
		const userId = user[0].id // Assuming userId is passed in the request URL

		const updateUser = {
			isLoggedIn: 1
		}

		// Construct the SET part of the SQL query dynamically
		const updateFields = Object.keys(updateUser)
			.map(key => `${key} = ?`)
			.join(', ')
		const updateValues = Object.values(updateUser)

		const query = `UPDATE users SET ${updateFields} WHERE id = ${userId}`
		const [result] = await pool.query(query, Object.values(updateUser))

		//.............................

		// update useractivities table...........
		//.....................................................finished useractivities table insertion

		const requestQuery = `INSERT INTO useractivities (id, logintime) VALUES (?, NOW())`
		const queryParams = [userId]

		const [resultt] = await pool.query(requestQuery, queryParams)

		//...................................................finished
		//.................................

		generateToken(res, user[0].id)

		// sending the user object and token as the response
		const token = jwt.sign({ id: user[0].id }, process.env.SECRET_KEY, {
			expiresIn: '30d'
		})
		res.status(200).json({ success: true, token, user: user[0] })
	} catch (error) {
		console.log(error)
		res
			.status(500)
			.json({ message: 'Something went wrong', error: error.message })
	}
})
// logout
exports.logout = asyncHandler(async (req, res) => {
	try {
		// if user doesn't exist
		if (!req.user)
			return res.status(404).json({ message: "User doesn't exist" })

		if (!req.user.status) {
			return res.status(408).json({ message: 'User access denied!' })
		}

		// update loggin status

		const updateUser = {
			isLoggedIn: 0,
			authToken: null
		}

		// Construct the SET part of the SQL query dynamically
		const updateFields = Object.keys(updateUser)
			.map(key => `${key} = ?`)
			.join(', ')
		const updateValues = Object.values(updateUser)

		const query = `UPDATE users SET ${updateFields} WHERE id = ${req.user.id}`
		const [result] = await pool.query(query, Object.values(updateValues))
		//.............................

		// update useractivities table...........
		//.....................................................finished useractivities table insertion
		// Fetch the last record from useractivities
		const [lastRecord] = await pool.query(
			'SELECT * FROM useractivities WHERE id = ? ORDER BY logintime DESC LIMIT 1',
			[req.user.id]
		)

		// Extract logintime from the last record
		const logintimeFromDB = lastRecord[0].logintime // Assuming logintime is a datetime field in the database

		// Convert logintime to a JavaScript Date object
		const logintime = new Date(logintimeFromDB)

		// Prepare useractivities object for insertion
		const useractivities = {
			logintime: logintime,
			id: req.user.id
		}

		// Prepare SQL query
		const requestQuery = `INSERT INTO useractivities (logintime, id, logouttime) VALUES (?, ?, NOW())`

		// Execute the query
		const [resultt] = await pool.query(requestQuery, [
			useractivities.logintime,
			useractivities.id
		])
		res.cookie('SABExport', '', {
			httpOnly: true,
			expires: new Date(0)
		})

		res.status(200).json({ success: true })

		//...................................................finished
		//.................................
	} catch (error) {
		console.log(error)

		res
			.status(500)
			.json({ message: 'Something went wrong', error: error.message })
	}
})

exports.getUserActivities = asyncHandler(async (req, res) => {
	try {
		const [requests] = await pool.query(`
            SELECT
                useractivities.*,
                users.*
            FROM
				useractivities
            JOIN
                users ON useractivities.id = users.id

        `)

		res.json({ success: true, product: requests })
	} catch (err) {
		return next(err)
	}
})

exports.autoLogin = asyncHandler(async (req, res) => {
	try {
		const { password, ...rest } = req.user

		res.status(200).json({ success: true, user: rest })
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Something went wrong', error: error.message })
	}
})
// Function to create a new user
exports.createUser = asyncHandler(async (req, res, next) => {
	try {
		const { name, email } = req.body
		const [result] = await pool.query(
			'INSERT INTO users (name, email) VALUES (?, ?)',
			[name, email]
		)
		res.status(201).json({ success: true, userId: result.insertId })
	} catch (error) {
		next(error)
	}
})

// user sign up controller
exports.createCustomer = asyncHandler(async (req, res, next) => {
	try {
		const [user, fields] = await pool.query(
			'SELECT * FROM users WHERE name = ?',
			[req.body.name]
		)


		if (user.length !== 0) {
			return res.status(409).json({ message: 'User already exists now' })
		}

		const encryptPassword = await bcrypt.hash('123456', 12)

		const newUser = {
			name: req.body.name,
			password: encryptPassword,
			expansePermission:
				req.body.expansePermission === undefined
					? 'no'
					: req.body.expansePermission,
			expanseEditPermission:
				req.body.expanseEditPermission === undefined
					? 'no'
					: req.body.expanseEditPermission,
			expanseDeletePermission:
				req.body.expanseDeletePermission === undefined
					? 'no'
					: req.body.expanseDeletePermission,
			receiptPermission:
				req.body.receiptPermission === undefined
					? 'no'
					: req.body.receiptPermission,
			receiptEditPermission:
				req.body.receiptEditPermission === undefined
					? 'no'
					: req.body.receiptEditPermission,
			receiptDeletePermission:
				req.body.receiptDeletePermission === undefined
					? 'no'
					: req.body.receiptDeletePermission,

			advancePermission:
				req.body.advancePermission === undefined
					? 'no'
					: req.body.advancePermission,
			advanceEditPermission:
				req.body.advanceEditPermission === undefined
					? 'no'
					: req.body.advanceEditPermission,
			advanceDeletePermission:
				req.body.advanceDeletePermission === undefined
					? 'no'
					: req.body.advanceDeletePermission,

			loanPermission:
				req.body.loanPermission === undefined ? 'no' : req.body.loanPermission,
			loanEditPermission:
				req.body.loanEditPermission === undefined
					? 'no'
					: req.body.loanEditPermission,
			loanDeletePermission:
				req.body.loanDeletePermission === undefined
					? 'no'
					: req.body.loanDeletePermission,
			pp: req.body.pp === undefined ? 'no' : req.body.pp,
			epp: req.body.epp === undefined ? 'no' : req.body.epp,
			excelPermission:
				req.body.excelPermission === undefined
					? 'no'
					: req.body.excelPermission,
			cp: req.body.cp === undefined ? 'no' : req.body.cp
		}

		const columns = Object.keys(newUser).join(',')
		const placeholders = Object.values(newUser)
			.map(() => '?')
			.join(',')

		const query = `INSERT INTO users (${columns}) VALUES (${placeholders})`
		const [result] = await pool.query(query, Object.values(newUser))

		// insert companies
		// Insert new company associations
		for (const comp of req.body.company) {
			const newUserCompany = {
				cid: +comp,
				uid: +result.insertId
			}

			const newUserCompanyColumns = Object.keys(newUserCompany).join(',')
			const newUserCompanyPlaceholders = Object.values(newUserCompany)
				.map(() => '?')
				.join(',')

			const newUserCompanyQuery = `INSERT INTO usercompany (${newUserCompanyColumns},createdAt) VALUES (${newUserCompanyPlaceholders},NOW())`
			await pool.query(newUserCompanyQuery, Object.values(newUserCompany))
		}

		res.json({ success: true })
	} catch (err) {
		return next(err)
	}
})

// user sign up controller
exports.getCustomers = asyncHandler(async (req, res) => {
	try {
		const [users] = await pool.query('select * from users ')
		res.status(200).json({ success: true, data: users })
	} catch (err) {
		res
			.status(500)
			.json({ message: 'Something went wrong', error: err.message })
	}
})

// get all products of a shop
exports.updateCustomer = asyncHandler(async (req, res, next) => {
	const userId = req.params.id // Assuming userId is passed in the request URL

	try {
		const { company, ...rest } = req.body

		// Prepare update data for users table
		const updateFields = Object.keys(rest)
			.map(key => `${key} = ?`)
			.join(', ')
		const updateValues = Object.values(rest)

		// Update users table
		const updateUserQuery = `UPDATE users SET ${updateFields} WHERE id = ?`
		const [updateUserResult] = await pool.query(updateUserQuery, [
			...updateValues,
			userId
		])

		if (updateUserResult.affectedRows === 0) {
			return res.status(404).json({ success: false, message: 'User not found' })
		}

		// Fetch current user's company associations
		const [userAccessed] = await pool.query(
			'SELECT * FROM usercompany WHERE uid = ?',
			[userId]
		)

		const userCompanyCids = userAccessed.map(item => item.cid)
		const newCompanyCids = company.map(item => item.cid)

		// Companies to add
		const companiesToAdd = company.filter(
			comp => !userCompanyCids.includes(comp.cid)
		)

		// Companies to remove
		const companiesToRemove = userCompanyCids.filter(
			cid => !newCompanyCids.includes(cid)
		)

		// Insert new company associations
		for (const comp of companiesToAdd) {
			const newUserCompany = {
				cid: +comp.cid,
				uid: +userId
			}

			const newUserCompanyColumns = Object.keys(newUserCompany).join(',')
			const newUserCompanyPlaceholders = Object.values(newUserCompany)
				.map(() => '?')
				.join(',')

			const newUserCompanyQuery = `INSERT INTO usercompany (${newUserCompanyColumns}) VALUES (${newUserCompanyPlaceholders})`
			await pool.query(newUserCompanyQuery, Object.values(newUserCompany))
		}

		// Remove old company associations
		if (companiesToRemove.length > 0) {
			const removeQuery = `DELETE FROM usercompany WHERE uid = ? AND cid IN (${companiesToRemove.join(
				','
			)})`
			await pool.query(removeQuery, [userId])
		}

		// If everything succeeds
		res.status(200).json({ success: true })
	} catch (err) {
		console.error('Error updating customer:', err)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

// get all products of a shop
exports.logoutUserAccount = asyncHandler(async (req, res, next) => {
	try {
		const userId = req.params.id // Assuming userId is passed in the request URL
		const updateUser = {
			isLoggedIn: 0
		}

		// Construct the SET part of the SQL query dynamically
		const updateFields = Object.keys(updateUser)
			.map(key => `${key} = ?`)
			.join(', ')
		const updateValues = Object.values(updateUser)

		const query = `UPDATE users SET ${updateFields} WHERE id = ${userId}`

		const [result] = await pool.query(query, [...updateValues])

		///////////////////////////////////////////////////////////////////////

		// Construct the SET part of the SQL query dynamically

		// update useractivities table...........
		//.....................................................finished useractivities table insertion
		// Fetch the last record from useractivities
		const [lastRecord] = await pool.query(
			'SELECT * FROM useractivities WHERE id = ? ORDER BY logintime DESC LIMIT 1',
			[userId]
		)

		// Extract logintime from the last record
		const logintimeFromDB = lastRecord[0].logintime // Assuming logintime is a datetime field in the database

		// Convert logintime to a JavaScript Date object
		const logintime = new Date(logintimeFromDB)

		// Prepare useractivities object for insertion
		const useractivities = {
			logintime: logintime,
			id: userId
		}

		// Prepare SQL query
		const requestQuery = `INSERT INTO useractivities (logintime, id, logouttime) VALUES (?, ?, NOW())`

		// Execute the query
		const [resultt] = await pool.query(requestQuery, [
			useractivities.logintime,
			useractivities.id
		])

		//////////////////////////////////////////////////////////////////////

		const [requests] = await pool.query(`
				SELECT
					useractivities.*,
					users.*
				FROM
					useractivities
				JOIN
					users ON useractivities.id = users.id

			`)

		res.json({ success: true, product: requests })
	} catch (err) {
		console.log(err)
		return next(err)
	}
})
// get all products of a shop
exports.updatePassword = asyncHandler(async (req, res, next) => {
	try {
		const id = req.params.id // Assuming userId is passed in the request URL

		const encryptPassword = await bcrypt.hash(req.body.password, 12)

		const updateUser = {
			password: encryptPassword
		}

		// Construct the SET part of the SQL query dynamically
		const updateFields = Object.keys(updateUser)
			.map(key => `${key} = ?`)
			.join(', ')
		const updateValues = Object.values(updateUser)

		const query = `UPDATE users SET ${updateFields} WHERE id = ${id}`

		const [result] = await pool.query(query, [...updateValues])

		res.status(200).json({ success: true })
	} catch (err) {
		return next(err)
	}
})

exports.resetUserPassword = asyncHandler(async (req, res, next) => {
	try {
		const userId = req.params.id // Assuming userId is passed in the request URL

		const data = {
			password: '123456'
		}

		const encryptPassword = await bcrypt.hash(data.password, 12)

		const updateUser = {
			password: encryptPassword
		}

		// Construct the SET part of the SQL query dynamically
		const updateFields = Object.keys(updateUser)
			.map(key => `${key} = ?`)
			.join(', ')
		const updateValues = Object.values(updateUser)

		const query = `UPDATE users SET ${updateFields} WHERE id = ${userId}`

		const [result] = await pool.query(query, [...updateValues])

		res.status(200).json({ success: true })
	} catch (err) {
		return next(err)
	}
})

// Activation function
exports.Activation = asyncHandler(async (req, res, next) => {
	try {
		const [user, fields] = await pool.query(
			'SELECT * FROM users WHERE id = ?',
			[req.params.id]
		)

		user[0].status = !user[0].status

		const updateUser = {
			status: user[0].status
		}

		// Construct the SET part of the SQL query dynamically
		const updateFields = Object.keys(updateUser)
			.map(key => `${key} = ?`)
			.join(', ')
		const updateValues = Object.values(updateUser)

		const query = `UPDATE users SET ${updateFields} WHERE id = ${req.params.id}`

		const [result] = await pool.query(query, [...updateValues])

		if (result.affectedRows > 0) {
			res.status(200).json({ success: true })
		} else {
			res.status(404).json({ error: 'User not found' })
		}
	} catch (err) {
		return next(err)
	}
})

// delete user controller
exports.deleteUser = asyncHandler(async (req, res) => {
	const userID = req.params.id

	const { currentUserId, currentUserAdminStatus } = req.body

	if (currentUserId === userID || currentUserAdminStatus) {
		try {
			// find user by userID and delete it
			await User.findByIdAndDelete(userID)

			// sending the status message successful
			res.status(200).json({ success: true, message: 'User deleted!' })
		} catch (error) {
			res
				.status(500)
				.json({ message: 'Something went wrong', error: error.message })
		}
	} else {
		res.status(403).json('Access Denied! You can delete own profile!')
	}
})

// userController.js

// Function to retrieve a user by ID
exports.getUserById = asyncHandler(async (req, res, next) => {
	try {
		const userId = req.params.id
		const [rows, fields] = await pool.query(
			'SELECT * FROM users WHERE id = ?',
			[userId]
		)
		if (rows.length > 0) {
			res.json(rows[0])
		} else {
			res.status(404).json({ error: 'User not found' })
		}
	} catch (error) {
		next(error)
	}
})

// Function to update a user by ID
exports.updateUser = asyncHandler(async (req, res, next) => {
	try {
		const userId = req.params.id
		const { name, email } = req.body
		const [result] = await pool.query(
			'UPDATE users SET name = ?, email = ? WHERE id = ?',
			[name, email, userId]
		)
		if (result.affectedRows > 0) {
			res.json({ success: true })
		} else {
			res.status(404).json({ error: 'User not found' })
		}
	} catch (error) {
		next(error)
	}
})

// Function to delete a user by ID
exports.deleteUser = asyncHandler(async (req, res, next) => {
	try {
		const userId = req.params.id
		const [result] = await pool.query('DELETE FROM users WHERE id = ?', [
			userId
		])
		if (result.affectedRows > 0) {
			res.json({ success: true })
		} else {
			res.status(404).json({ error: 'User not found' })
		}
	} catch (error) {
		next(error)
	}
})
