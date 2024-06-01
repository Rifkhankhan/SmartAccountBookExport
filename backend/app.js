const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const mysql = require('mysql')

const userrouter = require('./Routes/userrouter')
const AccountRequestRouter = require('./Routes/AccountRequestRouter')
const RequestRouter = require('./Routes/RequestRouter')
const CompanyRouter = require('./Routes/CompanyRouter')

const app = express()
const PORT = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

// Allow requests from all origins
app.use(cors())

// Your other middleware and routes
app.use(express.json())
// CORS Configurations
// app.use(
// 	cors({
// 		origin: 'https://hopper-front.vercel.app'
// 	})
// )

// Connect to MySQL
const pool = require('./MysqlConnection')

// Define Routes
// Define your routes here
app.use('/user', userrouter)
app.use('/company', CompanyRouter)
app.use('/accountRequest', AccountRequestRouter)
app.use('/requests', RequestRouter)

// Express Server
const server = app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})

// Error Handling Middleware
app.use((error, req, res, next) => {
	if (!res.headersSent) {
		res
			.status(error.code || 500)
			.json({ message: error.message || 'An unknown error occurred!' })
	}
})

// Serve images from the 'uploads' directory
app.use('/uploads', express.static('uploads'))
