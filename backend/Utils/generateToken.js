const jwt = require('jsonwebtoken')

const generateToken = (res, id) => {
	console.log(id)
	try {
		const token = jwt.sign({ id: id }, process.env.SECRET_KEY, {
			expiresIn: '30d'
		})

		// Set JWT as HTTP-only cookie
		res.cookie('jwt', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV !== 'development',
			secure: false,

			maxAge: 30 * 24 * 60 * 60 * 1000,
			sameSite: 'strict'
		})
	} catch (error) {
		console.error('Error generating token', error)
		res.status(500).send('Internal Server Error')
	}
}

module.exports = generateToken
