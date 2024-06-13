import React, { useEffect, useLayoutEffect, useState } from 'react'
import styles from './Receipt.module.css'

import ReceiptForm from '../../Components/ReceiptForm/ReceiptForm'
import PaginationTable from '../../Components/PaginationTable/PaginationTable'
import { useDispatch, useSelector } from 'react-redux'
import ReceiptModel from '../../Components/ReceiptModel/ReceiptModel'
import { deleteAccountRequest } from '../../Actions/AccountRequestActions'
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner'
import { getUserComponies, getcompanies } from '../../Actions/CompanyActions'
import DemoTable from '../../Components/DemoTable/DemoTable'
const Receipt = () => {
	const [showDemoTable, setShowDemoTable] = useState(false)
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
	const currentUser = useSelector(state => state.auth.user)
	const isLoading = useSelector(state => state.accountRequest.isLoading)
	const companies = useSelector(state => state.company.companies)
	const userCompanies = useSelector(state => state.company.userCompanies)
	const [selectedCompany, setSelectedCompany] = useState(1)

	const receipts = useSelector(state => state.accountRequest.accountRequests)
		?.filter(expanse => expanse.requestType === 'receipt')
		?.filter(
			request => request.status === 1 && +request.cid === +selectedCompany
		)

	const TableReceipt = useSelector(
		state => state.accountRequest.accountRequests
	)
		?.filter(expanse => expanse.requestType === 'receipt')
		?.filter(
			request => request.status === 1 && +request.cid === +selectedCompany
		)

	const [showModal, setShowModal] = useState(false)
	const [clickedRow, setClickedRow] = useState({})
	const [totalCash, setTotalCash] = useState(0)
	const [totalTodayCash, setTotalTodayCash] = useState(0)
	const [totalCapital, setTotalCapital] = useState(0)
	const [totalTodayCapital, setTotalTodayCapital] = useState(0)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getUserComponies(currentUser.id))
		dispatch(getcompanies())
	}, [currentUser, dispatch])

	const handleModel = id => {
		setClickedRow(id)

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
	const getTotalExpenseForDate = (expenses, targetDate, type) => {
		// Filter expenses for the target date

		const expensesForDate = expenses
			.filter(
				expense =>
					new Date(expense.date).toISOString().split('T')[0] ===
					new Date(targetDate).toISOString().split('T')[0]
			)
			.filter(expense => expense.requestForm === type)

		// Calculate total amount for the target date
		const totalExpenseForDate = expensesForDate.reduce(
			(total, expense) => total + +expense.amount,
			0
		)

		return totalExpenseForDate
	}
	const getTotalIncomeAmount = incomes => {
		// calculate total expenses

		const totalIncomes = incomes.reduce((total, current) => {
			if (current.requestForm === 'cash') {
				return total + +current.amount
			}
			return total // Make sure to return total even if the condition isn't met
		}, 0)

		const totalCapital = incomes.reduce((total, current) => {
			if (current.requestForm === 'capital') {
				return total + +current.amount
			}
			return total // Make sure to return total even if the condition isn't met
		}, 0)

		setTotalCash(totalIncomes)

		setTotalCapital(totalCapital)

		setTotalTodayCapital(
			getTotalExpenseForDate(receipts, new Date(), 'capital')
		)
		setTotalTodayCash(getTotalExpenseForDate(receipts, new Date(), 'cash'))
	}
	useLayoutEffect(() => {
		getTotalIncomeAmount(receipts)
	}, [receipts])

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
							<div
								className="row"
								style={{
									height: '25%',
									paddingInline: '5vh'
								}}>
								<h3
									className="col"
									style={{
										margin: 'auto',
										fontSize: '3.5vh',
										borderBottom: '1px solid white',
										paddingBlock: '1vh',
										marginBlock: '1vh'
									}}>
									Total
								</h3>
							</div>
							<div
								style={{
									height: '75%',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'flex-start',
									flexDirection: 'column',
									margin: 'auto'
								}}>
								<div className="row" style={{ marginInline: 'auto' }}>
									<h5 className="col-md-6 " style={{ textAlign: 'center' }}>
										Cash
									</h5>
									<p className="col-md-6 " style={{ textAlign: 'center' }}>
										{totalCash}
									</p>
								</div>

								<div className="row" style={{ marginInline: 'auto' }}>
									<h5 className="col-md-6" style={{ textAlign: 'center' }}>
										Capital
									</h5>
									<p className="col-md-6" style={{ textAlign: 'center' }}>
										{totalCapital}
									</p>
								</div>
							</div>
						</div>
						<div className={`col-12 col-md-5 mb-2, ${styles.column}`}>
							<div
								className="row"
								style={{
									height: '25%',
									paddingInline: '5vh'
								}}>
								<h3
									className="col"
									style={{
										margin: 'auto',
										fontSize: '3.5vh',
										borderBottom: '1px solid white',
										paddingBlock: '1vh',
										marginBlock: '1vh'
									}}>
									Today
								</h3>
							</div>
							<div
								style={{
									height: '75%',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'flex-start',
									flexDirection: 'column',
									margin: 'auto'
								}}>
								<div className="row" style={{ marginInline: 'auto' }}>
									<h5 className="col-md-6 " style={{ textAlign: 'center' }}>
										Cash
									</h5>
									<p className="col-md-6 " style={{ textAlign: 'center' }}>
										{totalTodayCash}
									</p>
								</div>

								<div className="row" style={{ marginInline: 'auto' }}>
									<h5 className="col-md-6" style={{ textAlign: 'center' }}>
										Capital
									</h5>
									<p className="col-md-6" style={{ textAlign: 'center' }}>
										{totalTodayCapital}
									</p>
								</div>
							</div>
						</div>
					</section>
				</div>
				<div className="col-12 col-md-7">
					<ReceiptForm
						header="cr"
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
				<h2 style={{ textAlign: 'left', color: 'white' }}>Receipts</h2>
				<div className={`col`}>
					<PaginationTable
						list={TableReceipt}
						handleModel={handleModel}
						tableType="receipt"
						companies={companies}
						userCompanies={userCompanies}
						selectedCompany={selectedCompany}
					/>
				</div>
			</section>

			{showModal && (
				<ReceiptModel
					clickedRow={clickedRow}
					showModal={showModal}
					closeHandler={handleModel}
					deleteHandler={deleteHandler}
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

export default Receipt
