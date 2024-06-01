import React, { useEffect, useRef, useState } from 'react'
import {
	Chart,
	LineElement,
	CategoryScale,
	LinearScale, //y
	PointElement,
	Tooltip,
	Legend
} from 'chart.js'
import { Line } from 'react-chartjs-2'

Chart.register(
	LineElement,
	CategoryScale,
	LinearScale,
	PointElement,
	Tooltip,
	Legend
)

const LineChart = ({ expenses, receipts, requestList }) => {
	// Get today's date
	const today = new Date()
	// Initialize an array to store the labels
	const labels = []

	// Loop to generate labels for the past 7 days
	for (let i = 6; i >= 0; i--) {
		// Calculate the date for each day
		const date = new Date(today)
		date.setDate(today.getDate() - i)

		// Format the date as 'YYYY-MM-DD'
		const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
			.toString()
			.padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`

		// Push the formatted date into the labels array
		labels.push(formattedDate)
	}

	// for expense

	const [amountByDate, setAmountByDate] = useState({})
	const [listByDate, setListByDate] = useState({})

	const [receiptByDate, setReceiptByDate] = useState({})

	const receiptLine = receipts => {
		const today = new Date()
		const sevenDaysAgo = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000) // Include today

		// Step 1: Filter receipts for the last 7 days
		const filteredReceipts = receipts.filter(receipt => {
			const receiptDate = new Date(receipt.date)
			return receiptDate >= sevenDaysAgo && receiptDate <= today
		})

		// Step 2: Group receipts by date
		const receiptsByDate = {}
		filteredReceipts.forEach(receipt => {
			const date = receipt.date.split(' ')[0] // Extract date part only
			if (!receiptsByDate[date]) {
				receiptsByDate[date] = []
			}
			receiptsByDate[date].push(receipt)
		})

		// Step 3: Calculate sum of amounts for each date
		const sumsByDate = {}
		for (const date in receiptsByDate) {
			const amounts = receiptsByDate[date].map(receipt =>
				parseInt(receipt.amount)
			)
			sumsByDate[date] = {
				sum: amounts.reduce((total, amount) => total + amount, 0),
				date: date
			}
		}

		setReceiptByDate(sumsByDate)
	}

	const expenseLine = receipts => {
		const today = new Date()
		const sevenDaysAgo = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000) // Include today

		// Step 1: Filter receipts for the last 7 days
		const filteredReceipts = receipts.filter(receipt => {
			const receiptDate = new Date(receipt.date)
			return receiptDate >= sevenDaysAgo && receiptDate <= today
		})

		// Step 2: Group receipts by date
		const receiptsByDate = {}
		filteredReceipts.forEach(receipt => {
			const date = receipt.date.split(' ')[0] // Extract date part only
			if (!receiptsByDate[date]) {
				receiptsByDate[date] = []
			}
			receiptsByDate[date].push(receipt)
		})

		// Step 3: Calculate sum of amounts for each date
		const sumsByDate = {}
		for (const date in receiptsByDate) {
			const amounts = receiptsByDate[date].map(receipt =>
				parseInt(receipt.amount)
			)
			sumsByDate[date] = {
				sum: amounts.reduce((total, amount) => total + amount, 0),
				date: date
			}
		}

		setAmountByDate(sumsByDate)
	}

	const balanceLine = receipts => {
		const today = new Date()
		const sevenDaysAgo = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000) // Include today

		// Step 1: Filter receipts for the last 7 days
		const filteredReceipts = receipts.filter(receipt => {
			const receiptDate = new Date(receipt.date)
			return receiptDate >= sevenDaysAgo && receiptDate <= today
		})

		// Step 2: Group receipts by date
		const receiptsByDate = {}
		filteredReceipts.forEach(receipt => {
			const date = receipt.date.split(' ')[0] // Extract date part only
			if (!receiptsByDate[date]) {
				receiptsByDate[date] = []
			}
			receiptsByDate[date].push(receipt)
		})

		// Step 3: Calculate sum of amounts for each date
		const balances = {}
		for (const date in receiptsByDate) {
			let totalIncome = 0
			let totalExpense = 0

			receiptsByDate[date].forEach(entry => {
				if (entry.requestForm === 'got' || entry.requestType === 'receipt') {
					totalIncome += +entry.amount
				} else {
					totalExpense += +entry.amount
				}
			})

			// const balance = +totalIncome - +totalExpense
			// balances[date] = balance

			balances[date] = {
				sum: +totalIncome - +totalExpense,
				date: date
			}
		}

		setListByDate(balances)
	}

	useEffect(() => {
		receiptLine(receipts)
		expenseLine(expenses)
		balanceLine(requestList)
	}, [expenses, receipts, requestList])

	// Convert object to array of values
	const amounts = Object.values(amountByDate)
	const receiptsLists = Object.values(receiptByDate)
	const balanceList = Object.values(listByDate)

	const data = {
		labels: labels,
		datasets: [
			{
				label: 'Income',
				data: labels.map(date => {
					const found = receiptsLists.find(item => item.date === date)
					return found ? found.sum : 0
				}),
				backgroundColor: 'aqua',
				borderColor: 'yellow',
				pointBorderColor: 'aqua'
			},
			{
				label: 'Expense',
				data: labels.map(date => {
					const found = amounts.find(item => item.date === date)
					return found ? found.sum : 0
				}),
				backgroundColor: 'red',
				borderColor: 'aqua',
				pointBorderColor: 'red'
			},
			{
				label: 'Balance',
				data: labels.map(date => {
					const found = balanceList.find(item => item.date === date)
					return found ? found.sum : 0
				}),
				backgroundColor: 'orange',
				borderColor: 'green',
				pointBorderColor: 'orange'
			}
		]
	}

	const options = {
		plugins: {
			legend: {
				labels: {
					color: 'white' // Change legend font color
				}
			}
		},
		scales: {
			x: {
				grid: {
					color: 'rgba(255, 255, 255, 0.1)' // Change x-axis grid color
				},
				ticks: {
					color: 'white' // Change x-axis tick font color
				}
			},
			y: {
				grid: {
					color: 'rgba(255, 255, 255, 0.1)' // Change y-axis grid color
				},
				ticks: {
					color: 'white' // Change y-axis tick font color
				}
			}
		},
		layout: {
			padding: {
				left: 20,
				right: 20,
				top: 20,
				bottom: 20
			}
		},
		maintainAspectRatio: false,
		responsive: true,
		elements: {
			point: {
				backgroundColor: 'white' // Change point background color
			}
		},
		width: 400,
		height: 1000
	}

	return (
		<div className="chart-container" style={{ width: '100%', height: '100%' }}>
			<Line data={data} options={options} />
		</div>
	)
}

export default LineChart
