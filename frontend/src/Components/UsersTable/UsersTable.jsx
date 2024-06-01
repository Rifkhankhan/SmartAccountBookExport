import React, { useState } from 'react'
import styles from './UsersTable.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'bootstrap'
const UsersTable = ({ initialData, handleModel, getIdHandler }) => {
	const [filter, setFilter] = useState('')

	const handleFilterChange = event => {
		setFilter(event.target.value)
	}
	return (
		<div className={`container ${styles.tableContainer}`}>
			<input
				type="text"
				value={filter}
				onChange={handleFilterChange}
				className={`form-control mb-3 col-12 col-md-6 ${styles.inputTag}`}
				placeholder="Search for you want.."
			/>
			<table className="table table-hover thead-dark w-100 f-1">
				<thead className="thead-dark">
					<tr>
						<th>Name</th>

						<th>Expense Permission</th>
						<th>Expense Delete Permission</th>
						<th>Receipt Permission</th>
						<th>Receipt Delete Permission</th>
					</tr>
				</thead>
				<tbody>
					{initialData?.map(
						(item, index) =>
							item.name?.toLowerCase().includes(filter.toLowerCase()) && (
								<tr
									key={index}
									onClick={() => {
										handleModel()
										getIdHandler(item?.id)
									}}>
									<td>{item?.name}</td>

									<td
										className={
											item?.expansePermission === 'yes'
												? 'bg-primary '
												: 'bg-dark text-light'
										}>
										{item?.expansePermission === 'yes' ? 'Granted' : 'denied'}
									</td>
									<td
										className={
											item?.expanseDeletePermission === 'yes'
												? 'bg-primary '
												: 'bg-dark text-light'
										}>
										{item?.expanseDeletePermission === 'yes'
											? 'Granted'
											: 'denied'}
									</td>
									<td
										className={
											item?.receiptPermission === 'yes'
												? 'bg-primary '
												: 'bg-dark text-light'
										}>
										{item?.receiptPermission === 'yes' ? 'Granted' : 'denied'}
									</td>
									<td
										className={
											item?.receiptDeletePermission === 'yes'
												? 'bg-primary '
												: 'bg-dark text-light'
										}>
										{item?.receiptDeletePermission === 'yes'
											? 'Granted'
											: 'denied'}
									</td>
								</tr>
							)
					)}
				</tbody>
			</table>
		</div>
	)
}

export default UsersTable
