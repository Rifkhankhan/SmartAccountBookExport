import React, { useState } from 'react'
import styles from './DataActivityTable.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'

const DataActivityTable = ({ initialData }) => {
	const [filter, setFilter] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const pageSize = 10 // Number of items per page
	const maxVisiblePages = 5 // Maximum number of visible pagination buttons

	const handleFilterChange = event => {
		setCurrentPage(1) // Reset to first page when filter changes
		setFilter(event.target.value)
	}

	const filteredData = initialData.filter(item => {
		const filterLower = filter.toLowerCase()
		return (
			String(item.rid).toLowerCase().includes(filterLower) ||
			String(item.name).toLowerCase().includes(filterLower) ||
			String(item.id).toLowerCase().includes(filterLower) ||
			String(item.arid).toLowerCase().includes(filterLower) ||
			String(item.amount).toLowerCase().includes(filterLower) ||
			(item.deleteAt && item.deleteAt.toLowerCase().includes(filterLower)) ||
			(item.createAt && item.createAt.toLowerCase().includes(filterLower)) ||
			(item.updateAt && item.updateAt.toLowerCase().includes(filterLower)) ||
			(item.date_reset && item.date_reset.toLowerCase().includes(filterLower))
		)
	})

	// Sort the filteredData array by multiple criteria
	filteredData.sort((a, b) => {
		// Sort by createAt
		if (a.createAt < b.createAt) return -1
		if (a.createAt > b.createAt) return 1

		// If createAt is the same, sort by updateAt
		if (a.updateAt < b.updateAt) return -1
		if (a.updateAt > b.updateAt) return 1

		// If updateAt is also the same, sort by deleteAt
		if (a.deleteAt < b.deleteAt) return -1
		if (a.deleteAt > b.deleteAt) return 1

		// If updateAt is also the same, sort by deleteAt
		if (a.date_reset < b.date_reset) return -1
		if (a.date_reset > b.date_reset) return 1

		// If all criteria are the same, maintain the original order
		return 0
	})
	const totalPages = Math.ceil(filteredData.length / pageSize)

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

	const visibleData = filteredData.slice(
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
						<th>Request ID</th>
						<th>User</th>
						<th>Status</th>
						<th>Amount</th>
						<th>Create Date</th>
						<th>Update Date</th>
						<th>Delete Date</th>
						<th>Reset Date</th>
					</tr>
				</thead>
				<tbody>
					{visibleData.map((item, index) => (
						<tr key={index}>
							<td>{item?.rid}</td>
							<td>{item?.arid}</td>
							<td>{item?.name}</td>
							<td>{+item?.status === 0 ? 'Deleted' : 'Active'}</td>
							<td>{item?.amount}</td>
							<td>{item?.createAt}</td>
							<td>{item?.updateAt}</td>
							<td>{item?.deleteAt}</td>
							<td>{item?.date_reset}</td>
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

export default DataActivityTable
