import React, { useEffect, useLayoutEffect, useState } from 'react'
import styles from './Payment.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBill, faSackDollar } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import PaginationTable from '../../Components/PaginationTable/PaginationTable'
import ExpanseForm from '../../Components/ExpanseForm/ExpanseForm'
import ExpanseModel from '../../Components/ExpanseModel/ExpanseModel'

import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner'
import {
	deleteAccountRequest,
	updateAccountRequest
} from '../../Actions/AccountRequestActions'
import DemoTable from '../../Components/DemoTable/DemoTable'
const Payment = () => {
	const [showDemoTable, setShowDemoTable] = useState(false)
	const currentUser = useSelector(state => state.auth.user)
	const demoHeaders = [
		'#',
		'Date',
		'Company',
		'Amount',
		'Category',
		'Payment Type',
		'Method',
		'Narration'
	]

	const companies = useSelector(state => state.company.companies)
	const userCompanies = useSelector(state => state.company.userCompanies)
	const [selectedCompany, setSelectedCompany] = useState(1)

	const expenses = useSelector(state => state.accountRequest.accountRequests)
		?.filter(request => request.requestForm === 'expense')
		?.filter(
			request => request.status === 1 && +request.cid === +selectedCompany
		)

	const expensesTable = useSelector(
		state => state.accountRequest.accountRequests
	)?.filter(
		request => request.status === 1 && +request.cid === +selectedCompany
	)

	const isLoading = useSelector(state => state.accountRequest.isLoading)

	const dispatch = useDispatch()
	const [showModal, setShowModal] = useState(false)
	const [clickedRow, setClickedRow] = useState({})
	const [totalExpanses, setTotalExpanses] = useState(0)
	const [todayTotalExpanses, setTodayTotalExpanses] = useState(0)

	const handleModel = id => {
		setClickedRow(id)
		setShowModal(current => !current)
	}

	const closeHandler = () => {
		setShowModal(current => !current)
	}

	const submitHandlerProp = (id, data) => {
		console.log(data)
		dispatch(updateAccountRequest(id, data))
		setShowModal(current => !current)
	}

	const deleteHandler = row => {
		handleModel()
		const data = {
			...row,
			id: currentUser.id
		}
		dispatch(deleteAccountRequest(data))
	}

	// Function to calculate total expense for a specific date
	const getTotalExpenseForDate = (expenses, targetDate) => {
		// Filter expenses for the target date

		const expensesForDate = expenses?.filter(
			expense =>
				new Date(expense.date).toISOString().split('T')[0] ===
				new Date(targetDate).toISOString().split('T')[0]
		)

		// Calculate total amount for the target date
		const totalExpenseForDate = expensesForDate.reduce(
			(total, expense) => total + +expense.amount,
			0
		)

		return totalExpenseForDate
	}

	useLayoutEffect(() => {
		const total = expenses?.reduce(
			(total, current) => total + +current.amount,
			0
		)
		setTotalExpanses(total)
		setTodayTotalExpanses(getTotalExpenseForDate(expenses, new Date()))
	}, [expenses])

	const uploadedFileHandler = e => {
		setShowDemoTable(current => !current)
	}

	return (
		<div className={`container-fluid ${styles.home}`}>
			<div className="row">
				<div className="col-12 col-md-5">
					<section className={`row mb-2 mx-auto w-100 `}>
						<div
							className={`col-md-auto w-100  ${styles.smallCard}`}
							style={{
								backgroundColor: 'red',
								color: 'white',
								display: 'flex',
								alignItems: 'center',
								fontSize: '1em'
							}}>
							<p style={{ marginBlock: 'auto', marginRight: 'auto' }}>
								Company :
							</p>
							<p
								style={{
									marginBlock: 'auto',
									marginLeft: 'auto',
									fontSize: '1.5em',
									fontWeight: 600
								}}>
								{userCompanies?.length === 1 ? (
									companies?.find(comp => comp.cid === userCompanies[0].cid)?.name
								) : (
									<select
										className="form-select  form-control me-auto"
										id="requestForm"
										value={selectedCompany}
										onChange={e => setSelectedCompany(e.target.value)}
										style={{
											border: 'none',
											backgroundColor: 'transparent'
										}}>
										{userCompanies?.map(userCompany => (
											<option value={userCompany.cid} key={userCompany.cid}>
												{
													companies?.find(comp => comp.cid === userCompany.cid)
														?.name
												}
											</option>
										))}
									</select>
								)}
							</p>
						</div>
					</section>
					<section className={`row ${styles.homeComponent}`}>
						<div className={`col-12 col-md-5 mb-2, ${styles.column}`}>
							<div className="row" style={{ flex: 1, height: '50%' }}>
								<h3
									className="col"
									style={{ margin: 'auto', fontSize: '1.3em' }}>
									Total Expenses
								</h3>
								<FontAwesomeIcon
									style={{ margin: 'auto', fontSize: '3em' }}
									className="col"
									icon={faMoneyBill}
								/>
							</div>

							<h5
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									flex: 1,
									height: '50%',
									fontSize: '2em'
								}}
								className="col">
								{totalExpanses}
							</h5>
						</div>
						<div className={`col-12 col-md-5 ${styles.column}`}>
							<div className="row" style={{ flex: 1, height: '50%' }}>
								<h3
									className="col"
									style={{ margin: 'auto', fontSize: '1.3em' }}>
									Today Expenses
								</h3>
								<FontAwesomeIcon
									style={{ margin: 'auto', fontSize: '3em' }}
									className="col"
									icon={faSackDollar}
								/>
							</div>

							<h5
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									flex: 1,
									height: '50%',
									fontSize: '2em'
								}}
								className="col">
								{todayTotalExpanses}
							</h5>
						</div>
					</section>
				</div>

				<div className="col-12 col-md-7">
					<ExpanseForm
						userCompanies={userCompanies}
						setShowDemoTable={setShowDemoTable}
						showDemoTable={showDemoTable}
					/>
				</div>
			</div>

			{showDemoTable && (
				<section className="container-fluid" style={{ margin: 'auto' }}>
					<h2 style={{ textAlign: 'left', color: 'white' }}>
						Table Headers Need Demo
					</h2>
					<div className={`col-12`}>
						<DemoTable demoHeadersProps={demoHeaders} />
					</div>
				</section>
			)}
			<section className="container-fluid" style={{ margin: 'auto' }}>
				<h2 style={{ textAlign: 'left', color: 'white' }}>Expenses</h2>
				<div className={`col-12`}>
					<PaginationTable
						list={expensesTable}
						handleModel={handleModel}
						tableType="expense"
						companies={companies}
						userCompanies={userCompanies}
						selectedCompany={selectedCompany}
					/>
				</div>
			</section>

			{/* <PDFComponent /> */}
			{showModal && (
				<ExpanseModel
					clickedRow={clickedRow}
					showModal={showModal}
					closeHandler={closeHandler}
					deleteHandler={deleteHandler}
					submitHandlerProp={submitHandlerProp}
					currentUser={currentUser}
					companies={companies}
					userCompanies={userCompanies}
					selectedCompany={selectedCompany}
				/>
			)}

			{isLoading && <LoadingSpinner />}
		</div>
	)
}

export default Payment
