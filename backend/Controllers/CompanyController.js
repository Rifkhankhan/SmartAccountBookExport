// const User = require('../Models/Blog');
const pool = require('../MysqlConnection')

const asyncHandler = require('../Middleware/asyncHandler')

exports.CreateCompany = asyncHandler(async (req, res, next) => {
	try {
		const newProduct = {
			name: req.body.name,
			location: req.body.location
		}

		const columns = Object.keys(newProduct).join(',')
		const placeholders = Object.values(newProduct)
			.map(() => '?')
			.join(',')

		const query = `INSERT INTO company (${columns}, createdAt) VALUES (${placeholders}, NOW())`

		const [result] = await pool.query(query, Object.values(newProduct))

		const [requests] = await pool.query('SELECT * FROM company')

		if (result.affectedRows > 0) {
			res.json({ success: true, requests: requests })
		}
	} catch (err) {
		console.error(err)
		res.json({ success: false })
	}
})

// get all products
exports.getcompanies = asyncHandler(async (req, res, next) => {
	try {
		const [products] = await pool.query('select * from company ')
		res.json({ success: true, product: products })
	} catch (err) {
		return next(err)
	}
})

// get user componies

exports.getUserComponies = asyncHandler(async (req, res, next) => {
	try {
		const [products] = await pool.query(
			'select * from usercompany where uid = ? ',
			[req.params.id]
		)
		res.json({ success: true, product: products })
	} catch (err) {
		return next(err)
	}
})
