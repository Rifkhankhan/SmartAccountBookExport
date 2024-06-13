const jwt = require('jsonwebtoken')
const asyncHandler = require('./asyncHandler')
const pool = require('../MysqlConnection')

exports.protect = asyncHandler(async (req, res, next) => {
	let token

	//  read the jwt from cookie

	token = req.cookies.jwt

	if (token) {
		try {
			const decodeToken = jwt.verify(token, process.env.SECRET_KEY)

			// finding user by email

			const [user] = await pool.query('SELECT * FROM users WHERE id = ?', [
				decodeToken.id
			])

			if (!user || user.length === 0) {
				console.error('User not found or empty result')
				// Handle the case where the user is not found or the result is empty
			} else {
				req.user = user[0]

				next()
			}
		} catch (error) {
			res.status(401)
			throw new Error('Not authorized , token failed')
		}
	} else {
		res.status(401)
		throw new Error('Not authorized , no token')
	}
})

// admin middleware

exports.admin = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		next()
	} else {
		res.status(401)
		throw new Error('Not authorized as Admin')
	}
}
