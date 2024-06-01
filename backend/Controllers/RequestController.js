// const User = require('../Models/Blog');
const AccountRequestModel = require('../Models/AccountRequestModel')
const { v4: uuid } = require('uuid')

const pool = require('../MysqlConnection')
const multer = require('multer')

// get all products
exports.getRequests = async (req, res, next) => {
	try {
		const [requests] = await pool.query(`
            SELECT 
                requests.*,
                users.name
            FROM 
                requests
            JOIN
                users ON requests.id = users.id
            JOIN
                accountrequest ON requests.arid = accountrequest.arid
        `)

		res.json({ success: true, product: requests })
	} catch (err) {
		return next(err)
	}
}

exports.resetData = async (req, res, next) => {
	console.log(req.body)
	try {
		const [product, fields] = await pool.query(
			'SELECT * FROM accountrequest WHERE arid = ?',
			[req.body.arid]
		)

		product[0].status = !product[0].status

		const updateProduct = {
			...product[0],
			status: product[0].status ? 1 : 0,
			deleteAt: null
		}

		console.log(updateProduct)

		// Construct the SET part of the SQL query dynamically
		const updateFields = Object.keys(updateProduct)

			.filter(key => key !== 'arid') // Exclude 'deleteAt' key
			.map(key => `${key} = ?`)
			.join(', ')

		// Construct the array of values for the update
		const updateValues = Object.keys(updateProduct)

			.filter(key => key !== 'arid') // Exclude 'deleteAt' key
			.map(key => updateProduct[key])

		const query = `UPDATE accountrequest SET ${updateFields} WHERE arid = ${req.body.arid}`

		const [result] = await pool.query(query, [...updateValues])

		//.....................................................finished account request table insertion

		const [lastRecord] = await pool.query(
			'SELECT * FROM accountrequest WHERE arid = ?',
			[req.body.arid]
		)
		const [updatedRequest] = await pool.query(
			'SELECT * FROM requests WHERE arid = ? ORDER BY rid DESC LIMIT 1',
			[req.body.arid]
		)

		const { rid, date_reset, ...resttt } = updatedRequest[0]
		const requestProduct = {
			...resttt,
			...lastRecord[0]
		}

		const requestColumns = Object.keys(requestProduct).join(',')

		const requestPlaceholders = Object.keys(requestProduct)
			.map(() => '?')
			.join(',')

		const requestQuery = `INSERT INTO requests (${requestColumns} , date_reset) VALUES (${requestPlaceholders},NOW())`

		const [requestResult] = await pool.query(
			requestQuery,
			Object.values(requestProduct)
		)

		//...................................................finished

		if (result.affectedRows > 0 && requestResult.affectedRows > 0) {
			const [requests] = await pool.query(`
            SELECT 
                requests.*,
                users.name
            FROM 
                requests
            JOIN
                users ON requests.id = users.id
            JOIN
                accountrequest ON requests.arid = accountrequest.arid
        `)

			const [accountrequests] = await pool.query('select * from accountrequest')

			console.log(accountrequests)
			console.log(requests)
			res.status(200).json({
				success: true,
				requests: requests,
				accountrequests: accountrequests
			})
		} else {
			res.status(404).json({ success: false, error: 'User not found' })
		}
	} catch (err) {
		console.log(err)
		return next(err)
	}
}
