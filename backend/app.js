const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const mysql = require('mysql')
const dotenv = require('dotenv')
const userrouter = require('./Routes/userrouter')
const AccountRequestRouter = require('./Routes/AccountRequestRouter')
const RequestRouter = require('./Routes/RequestRouter')
const CompanyRouter = require('./Routes/CompanyRouter')
const cookieParser = require('cookie-parser')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000
// Middleware setup
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Allow requests from all origins

// Your other middleware and routes
app.use(express.json())

const { notFound, errorHandler } = require('./Middleware/errorMiddleware')

// CORS configuration
const corsOptions = {
	origin: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '', // Set your frontend URL in production

	credentials: true, // Allow credentials (cookies)
	optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

// Define Routes
// Define your routes here
app.use('/user', userrouter)
app.use('/accountRequest', AccountRequestRouter)
app.use('/requests', RequestRouter)
app.use('/company', CompanyRouter)
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

// Serve images from the 'uploads' directory for render
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

// Serve images from the 'uploads' directory for cpanel
// app.use('/uploads', express.static(path.join(__dirname, '..',"..", 'uploads')))

// Deployment settings for render
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')))

	// Any route that is not an API will be redirected to index.html
	app.get('*', (req, res) =>
		res.sendFile(
			path.resolve(__dirname, '..', 'frontend', 'build', 'index.html')
		)
	)
} else {
	app.get('/', (req, res) => {
		res.send('API is Running!')
	})
}

// Deployment settings for cpanel
// if (process.env.NODE_ENV === 'production') {
// 	// Set static folder to serve frontend build files
// 	app.use(express.static(path.join(__dirname, '..', '..', 'public_html')));

// 	// Any route that is not an API will be redirected to index.html
// 	app.get('*', (req, res) => {
// 			res.sendFile(path.resolve(__dirname, '..', '..', 'public_html', 'index.html'));
// 	});
// } else {
// 	app.get('/', (req, res) => {
// 			res.send('API is Running!');
// 	});
// }

// Error handling middleware
app.use(notFound)
app.use(errorHandler)
