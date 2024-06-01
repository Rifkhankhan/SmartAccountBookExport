// table with date filter
import styles from './DemoTable.module.css'
import React, { useEffect, useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-datepicker/dist/react-datepicker.css'
import * as XLSX from 'xlsx'
import { FaCheck, FaMarkdown, FaTimes } from 'react-icons/fa'
import { Alert, Button, Row, Spinner, ProgressBar } from 'react-bootstrap'

import 'jspdf-autotable'
import { useDispatch, useSelector } from 'react-redux'
import { importAccountRequest } from '../../Actions/AccountRequestActions'
import ProgressBarComponent from '../ProgressBarComponent'

function DemoTable({ demoHeadersProps }) {
	// State variables
	const currentUser = useSelector(state => state.auth.user)
	const companies = useSelector(state => state.company.companies)

	const isLoading = useSelector(state => state.accountRequest.isLoading)
	const [elapsedTime, setElapsedTime] = useState(0)
	const [startTime, setStartTime] = useState()

	const [dataImported, setDataImported] = useState(false)
	const [excelData, setExcelData] = useState()
	const [headers, setHeaders] = useState()
	const dispatch = useDispatch()

	const [currentPage, setCurrentPage] = useState(1)
	const [itemsPerPage, setItemsPerPage] = useState(5)

	const filePickerRef = useRef()
	// Calculate current items
	const indexOfLastItem = currentPage * itemsPerPage
	const indexOfFirstItem = indexOfLastItem - itemsPerPage
	const currentItems = excelData?.slice(indexOfFirstItem, indexOfLastItem)
	// Change page
	const paginate = pageNumber => setCurrentPage(pageNumber)

	// Change items per page
	const handleItemsPerPageChange = e => {
		setItemsPerPage(parseInt(e.target.value))
		setCurrentPage(1) // Reset to first page when changing items per page
	}

	// Render pagination buttons
	const renderPaginationButtons = () => {
		const totalPageCount = Math.ceil(excelData?.length / itemsPerPage)
		const pageNumbers = []
		for (let i = 1; i <= totalPageCount; i++) {
			pageNumbers.push(
				<button
					key={i}
					onClick={() => paginate(i)}
					className={`btn ${currentPage === i ? 'btn-primary' : 'btn-light'}`}>
					{i}
				</button>
			)
		}
		return pageNumbers
	}

	// file uploading

	const pickHandler = e => {
		const reader = new FileReader()
		reader.readAsBinaryString(e.target.files[0])

		const demoHeaders = [
			'#',
			'Date',
			'Company',
			'Amount',
			'Category',
			'Payment Type',
			'Method',
			'Narration'
		].map(header => header.trim().toLowerCase().replace(/ /g, ''))

		reader.onload = e => {
			const data = e.target.result

			const workbook = XLSX.read(data, {
				type: 'binary',
				cellDates: true // Enable date parsing
			})

			const sheetName = workbook.SheetNames[0]
			const sheet = workbook.Sheets[sheetName]

			// Get the rows as arrays
			const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 })

			// Extract the headers (first row)
			const headers = rows[0].map(header => header.toLowerCase())
			setHeaders(headers)

			// Optionally, you can parse the remaining data
			const parsedData = XLSX.utils.sheet_to_json(sheet)

			// Filter and format the data to match demoHeaders
			const filteredData = parsedData.map(row => {
				const filteredRow = {}
				demoHeaders.forEach(header => {
					const key = Object.keys(row).find(
						k => k.toLowerCase().replace(/ /g, '') === header.replace(/ /g, '')
					)
					if (key) {
						if (header === 'date') {
							const date = new Date(row[key])
							// Format the date as 'm/d/yyyy'
							filteredRow[key] = `${
								date.getMonth() + 1
							}/${date.getDate()}/${date.getFullYear()}`
						} else {
							filteredRow[key] = row[key]
						}
					}
				})
				return filteredRow
			})

			// Set the headers and filtered data to state or handle them as needed
			setExcelData(filteredData)
		}
	}

	const pickImageHandler = () => {
		filePickerRef.current.click()
	}

	const demoHeadersPropsLowerCase = demoHeadersProps?.map(prop =>
		prop.trim().toLowerCase().replace(/ /g, '')
	)
	console.log(demoHeadersPropsLowerCase)

	const headerFilter = headers?.filter(
		header =>
			!demoHeadersPropsLowerCase.includes(
				header?.trim().toLowerCase().replace(/ /g, '')
			)
	)

	const uploadData = () => {
		// Create a mapping of company names to CIDs
		const companyMap = {}
		companies.forEach(company => {
			companyMap[company?.name?.toLowerCase().replace(/ /g, '')] = company?.cid
		})

		// Replace company names with corresponding CIDs in the data array
		const updatedData = excelData?.map(item => {
			const companyName = item.company.toLowerCase().replace(/ /g, '')
			return {
				...item,
				company: companyMap[companyName] || null // Use null if company name is not found
			}
		})

		console.log(updatedData)
		dispatch(importAccountRequest({ updatedData, id: currentUser.id }))
		setDataImported(true)
	}

	useEffect(() => {
		if (isLoading && dataImported) {
			const startTime = Date.now()
			setStartTime(startTime)
		} else if (!isLoading && dataImported) {
			const endTime = Date.now()

			setElapsedTime(endTime - startTime)
		}

		return () => {}
	}, [isLoading, dataImported, startTime])

	return (
		<div className={`container-fluid my-3 ${styles.tableContainer}`}>
			<div className="row">
				<div className="col-auto m-1">
					<select
						value={itemsPerPage}
						onChange={handleItemsPerPageChange}
						className="form-control form-control-sm">
						<option value={5}>5</option>
						<option value={10}>10</option>
						<option value={15}>15</option>
						<option value={excelData?.length}>All</option>
						{/* Add more options as needed */}
					</select>
				</div>

				<div className="col-auto">
					<input
						type="file"
						name=""
						value=""
						style={{ display: 'none' }}
						accept=".xls,.xlsx"
						onChange={pickHandler}
						ref={filePickerRef}
					/>

					<Button
						type="button"
						onClick={pickImageHandler}
						className="btn btn-primary btn-sm m-1">
						Upload Excel File
					</Button>
				</div>

				{headers && (
					<div className="col-auto">
						<Button
							type="button"
							onClick={uploadData}
							disabled={headerFilter?.length > 0 || isLoading}
							className="btn btn-danger btn-sm m-1">
							{headerFilter?.length > 0
								? `${headerFilter.length} Errors`
								: 'Upload This Data'}
						</Button>
					</div>
				)}
			</div>
			{isLoading && (
				<ProgressBarComponent loading={isLoading} elapsedTime={elapsedTime} />
			)}
			{/* {isLoading && (
				<Spinner
					animation="border"
					role="status"
					style={{
						width: '100px',
						color: 'white',
						height: '100px',
						margin: 'auto',
						display: 'block'
					}}></Spinner>
			)} */}
			{!isLoading && (
				<table className={`table table-bordered table-hover `} id="table">
					<thead>
						<tr>
							{demoHeadersProps.map(header => (
								<th>{header}</th>
							))}
						</tr>
					</thead>

					{headers && headers?.length > 0 && (
						<thead>
							<tr>
								<th>#</th>
								{headers?.map(header => (
									<th
										key={header}
										style={{
											color: !demoHeadersPropsLowerCase?.includes(
												header?.toLowerCase()
											)
												? 'red'
												: 'green'
										}}>
										{header.replace(/ /g, '')}
										{!demoHeadersPropsLowerCase?.includes(
											header?.toLowerCase().replace(/ /g, '')
										) ? (
											<FaTimes color="red" />
										) : (
											<FaCheck color="green" className="ms-1" />
										)}
									</th>
								))}
							</tr>
						</thead>
					)}

					<tbody>
						{currentItems?.map((item, index) => (
							<tr key={item}>
								<td>{index + 1}</td>
								<td>{item['date']}</td>
								<td
									style={{
										color:
											!item['company'] || item['company'] === null ? 'red' : ''
									}}>
									{!item['company'] || item['company'] === null
										? 'invalid data'
										: item['company']}
								</td>
								<td>{item['amount']}</td>
								<td>{item['category']}</td>
								<td style={{ textTransform: 'capitalize' }}>
									{item['payment type'] || item['paymenttype']}
								</td>
								<td style={{ textTransform: 'capitalize' }}>
									{item['narration']}
								</td>
								<td style={{ textTransform: 'capitalize' }}>
									{item['method']}
								</td>
								(
							</tr>
						))}
					</tbody>
					<tfoot>
						<tr>
							<td colSpan="8" className="text-right">
								{renderPaginationButtons()}
							</td>
						</tr>
					</tfoot>
				</table>
			)}
		</div>
	)
}

export default DemoTable
