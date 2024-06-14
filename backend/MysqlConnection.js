const mysql = require('mysql2/promise')
require('dotenv').config() // Load environment variables from .env file
// Create MySQL connection pool
const pool = mysql.createPool({
	host:
		process.env.NODE_ENV !== 'development' ? process.env.DB_HOST : 'localhost',
	user: process.env.NODE_ENV !== 'development' ? process.env.DB_USER : 'root',
	password:
		process.env.NODE_ENV !== 'development'
			? process.env.DB_PASSWORD
			: 'Mysql@123',
	database:
		process.env.NODE_ENV !== 'development'
			? process.env.DB_NAME
			: 'smartexport',
	port: process.env.NODE_ENV !== 'development' ? process.env.DB_PORT : null
})

// Check database connection
pool
	.getConnection()
	.then(connection => {
		console.log('Database connected successfully!')
		connection.release() // Release the connection back to the pool
	})
	.catch(error => {
		console.error('Error connecting to database:', error)
	})

module.exports = pool
