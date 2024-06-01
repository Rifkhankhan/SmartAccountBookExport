import React from 'react'
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import styles from './PieChart.module.css'

Chart.register(ArcElement, Tooltip, Legend)

const PieChart = ({ headDatas }) => {
	const data = {
		labels: [
			'Expenses',
			'Income',
			'Received Advance',
			'Paid Advance',
			'Received Loans',
			'Paid Loans'
		],
		datasets: [
			{
				data: headDatas,
				backgroundColor: [
					'rgb(255, 99, 132)',
					'rgb(54, 162, 235)',
					'red',
					'blue',
					'rgb(255, 205, 86)',
					'aqua'
				]
			}
		]
	}

	const isMobile = window.innerWidth <= 600

	const options = {
		plugins: {
			legend: {
				position: isMobile ? 'top' : 'right',
				labels: {
					color: 'white'
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
		elements: {
			point: {
				backgroundColor: 'white' // Change point background color
			}
		},
		maintainAspectRatio: false, // Set to false to allow full parent size
		responsive: true,
		width: 400,
		height: 300
	}

	return (
		<div
			className={styles.chartContainer}
			style={{ width: '100%', height: '100%' }}>
			<Pie data={data} options={options} />
		</div>
	)
}

export default PieChart
