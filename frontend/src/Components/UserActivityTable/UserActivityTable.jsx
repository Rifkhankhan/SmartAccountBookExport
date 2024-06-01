import React, { useState } from 'react'
import styles from './UserActivityTable.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'

const UserActivityTable = ({
	initialData,
	handleModel,
	getIdHandler,
	handleConfirmation
}) => {
	const [filter, setFilter] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const pageSize = 10 // Number of items per page
	const maxVisiblePages = 5 // Maximum number of visible pagination buttons

	const handleFilterChange = event => {
		setCurrentPage(1) // Reset to first page when filter changes
		setFilter(event.target.value)
	}

	// Filtered data
	const filteredData = initialData.filter(
		item =>
			String(item.rid).toLowerCase().includes(filter.toLowerCase()) ||
			String(item.id).toLowerCase().includes(filter.toLowerCase()) ||
			String(item.arid).toLowerCase().includes(filter.toLowerCase())
	)

	// Sort filtered data based on login time
	const sortedData = filteredData.sort(
		(a, b) => new Date(a.logintime) - new Date(b.logintime)
	)

	// Paginated data
	const totalPages = Math.ceil(sortedData.length / pageSize)

	const handlePageChange = pageNumber => {
		setCurrentPage(pageNumber)
	}

	// Calculate the range of visible page numbers
	const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
	const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

	const visiblePages = []
	for (let i = startPage; i <= endPage; i++) {
		visiblePages.push(i)
	}

	const visibleData = sortedData.slice(
		(currentPage - 1) * pageSize,
		currentPage * pageSize
	)

	return (
		<div className={`container ${styles.tableContainer}`}>
			<input
				type="text"
				value={filter}
				onChange={handleFilterChange}
				className={`form-control mb-3 col-12 col-md-6 ${styles.inputTag}`}
				placeholder="Search for what you want..."
			/>
			<table className="table table-hover thead-dark w-100 f-1">
				<thead className="thead-dark">
					<tr>
						<th>#</th>
						<th>User</th>
						<th>Status</th>
						<th>Login Time</th>
						<th>Duration</th>
						<th>Logout Time</th>
						<th>Online</th>
					</tr>
				</thead>
				<tbody>
					{visibleData.map((item, index) => (
						<tr key={index} onClick={() => handleConfirmation(item.id)}>
							<td>{item?.aid}</td>
							<td>{item?.name}</td>
							<td>{+item?.status === 0 ? 'Blocked' : 'Active'}</td>
							<td>
								{item?.logintime &&
									new Date(item.logintime).toLocaleString('en-US', {
										timeZone: 'UTC',
										hour12: false
									})}
							</td>

							<td>
								{item.logintime && item.logouttime
									? // Calculate duration if both logintime and logouttime exist
									  (() => {
											const loginTime = new Date(item.logintime)
											const logoutTime = new Date(item.logouttime)
											const durationMs = logoutTime - loginTime

											// Convert duration from milliseconds to days, hours, minutes, and seconds
											const days = Math.floor(
												durationMs / (1000 * 60 * 60 * 24)
											)
											const hours = Math.floor(
												(durationMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
											)
											const minutes = Math.floor(
												(durationMs % (1000 * 60 * 60)) / (1000 * 60)
											)
											const seconds = Math.floor(
												(durationMs % (1000 * 60)) / 1000
											)

											return `${days} D, ${hours} H, ${minutes} M, ${seconds} S`
									  })()
									: // Display a message if either logintime or logouttime is missing
									  ''}
							</td>
							<td>
								{item?.logouttime &&
									new Date(item.logouttime).toLocaleString('en-US', {
										timeZone: 'UTC',
										hour12: false
									})}
							</td>
							<td
								style={{
									backgroundColor: item?.logouttime === null ? 'red' : 'black',
									color: 'white',
									fontWeight: 'bold'
								}}>
								{item?.logouttime === null ? 'Online' : 'Offline'}
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className="d-flex justify-content-center align-items-center">
				<button
					className="btn btn-icon btn-primary mx-1"
					onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
					disabled={currentPage === 1}>
					<BsChevronLeft />
				</button>
				{visiblePages.map(pageNumber => (
					<button
						key={pageNumber}
						className={`btn btn-icon btn-danger mx-1 ${
							currentPage === pageNumber ? 'active' : ''
						}`}
						onClick={() => handlePageChange(pageNumber)}>
						{pageNumber}
					</button>
				))}
				<button
					className="btn btn-icon btn-primary"
					onClick={() =>
						setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))
					}
					disabled={currentPage === totalPages}>
					<BsChevronRight />
				</button>
			</div>
			<div className="text-center">
				Page {currentPage} of {totalPages}
			</div>
		</div>
	)
}

export default UserActivityTable
