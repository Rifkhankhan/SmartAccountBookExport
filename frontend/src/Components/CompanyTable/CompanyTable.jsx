import React, { useState } from 'react'
import styles from './CompanyTable.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'

const CompanyTable = ({ initialData }) => {
	const [filter, setFilter] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const pageSize = 5 // Number of items per page
	const maxVisiblePages = 5 // Maximum number of visible pagination buttons

	const handleFilterChange = event => {
		setCurrentPage(1) // Reset to first page when filter changes
		setFilter(event.target.value)
	}

	const filteredData = initialData?.filter(item => {
		const filterLower = filter.toLowerCase()
		return (
			String(item.cid).toLowerCase().includes(filterLower) ||
			String(item.name).toLowerCase().includes(filterLower) ||
			String(item.location).toLowerCase().includes(filterLower)
		)
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
		<div className={`container mt-2 ${styles.tableContainer}`}>
			<table className="table table-hover thead-dark w-100 f-1">
				<thead className="thead-dark">
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Location</th>
					</tr>
				</thead>
				<tbody>
					{visibleData.map((item, index) => (
						<tr key={index}>
							<td>{item?.cid}</td>
							<td>{item?.name}</td>
							<td>{item?.location}</td>
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

export default CompanyTable
