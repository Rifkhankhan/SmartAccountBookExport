import React, { useEffect, useLayoutEffect, useState } from 'react'
import styles from './Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Row, Col } from 'react-bootstrap'

import { faPen } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'

import ResetPasswordModel from '../../Components/ResetPasswordModel/ResetPasswordModel'
import PieChart from '../../Components/PieChart/PieChart'
import LineChart from '../../Components/LineChart/LineChart'
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner'
import SummaryTable from '../../Components/SummaryTable/SummaryTable'
import {
	getBalance,
	getOpeningBalance,
	getTotalAdvanceAmount,
	getTotalExpenseAmount,
	getTotalIncomeAmount,
	getTotalLoanAmount
} from '../../Utils/Functions'

const Home = () => {
	const currentUser = useSelector(state => state.auth.user)
	const isLoading = useSelector(state => state.accountRequest.isLoading)

	const [totalExpanses, setTotalExpanses] = useState(0)
	const [totalIncomes, setTotalIncomes] = useState(0)
	const [captitalAmount, setCapitalAmount] = useState(0)
	const [openingBalance, setOpeningBalance] = useState(0)
	const [balance, setBalance] = useState(0)
	const [gotLoan, setGotLoan] = useState(0)
	const [paidLoan, setPaidLoan] = useState(0)
	const [gotAdvance, setGotAdvance] = useState(0)
	const [paidAdvance, setPaidAdvance] = useState(0)
	const [showPasswordModel, setPasswordModel] = useState(false)
	const userCompanies = useSelector(state => state.company.userCompanies)

	const companies = useSelector(state => state.company.companies)

	const [showModal, setShowModal] = useState(false)
	const [clickedRow, setClickedRow] = useState({})

	const today = new Date()
	const formattedDate = today.toLocaleDateString('en-GB') // Format: dd/mm/yyyy
	const [selectedCompany, setSelectedCompany] = useState(0)

	const requestList = useSelector(
		state => state.accountRequest.accountRequests
	).filter(
		request =>
			request.status === 1 &&
			(selectedCompany > 0 ? +request.cid === +selectedCompany : true)
	)

	const expanses = requestList
		?.filter(request => request.requestType === 'expense')
		.filter(
			request =>
				request.status === 1 &&
				(selectedCompany > 0 ? +request.cid === +selectedCompany : true)
		)

	const receipts = requestList
		?.filter(request => request.requestType === 'receipt')
		.filter(
			request =>
				request.status === 1 &&
				(selectedCompany > 0 ? +request.cid === +selectedCompany : true)
		)

	useLayoutEffect(() => {
		getOpeningBalance(requestList, setOpeningBalance)
		getTotalExpenseAmount(requestList, setTotalExpanses)
		getTotalIncomeAmount(requestList, setTotalIncomes, setCapitalAmount)
		getTotalAdvanceAmount(requestList, setPaidAdvance, setGotAdvance)
		getTotalLoanAmount(requestList, setPaidLoan, setGotLoan)
		getBalance(requestList, setBalance)
	}, [requestList])

	const handleExpenseModel = row => {
		setClickedRow(row)
		setShowModal(current => !current)
	}

	const handlePasswordModel = () => {
		setPasswordModel(current => !current)
	}

	const [chartHeight, setChartHeight] = useState(300) // Initial height, adjust as needed
	// Function to set the height of the charts
	const setChartHeights = () => {
		const windowHeight = window.innerHeight
		const newHeight = windowHeight * 0.4 // Adjust the multiplier as needed
		setChartHeight(newHeight)
	}

	// Update chart heights when component mounts or window resizes
	useEffect(() => {
		setChartHeights()
		window.addEventListener('resize', setChartHeights)
		return () => {
			window.removeEventListener('resize', setChartHeights)
		}
	}, [])

	const cardStyle = {
		background: 'white',
		backdropFilter: 'blur(20px) saturate(113%)',
		WebkitBackdropFilter: 'blur(20px) saturate(113%)',
		backgroundColor: 'rgba(255, 255, 255, 200)',
		borderRadius: '12px',
		border: '1px solid rgba(209, 213, 219, 0.3)'
	}

	const textStyleSmall = {
		fontSize: '3vh',
		textAlign: 'right',
		height: '30%',
		paddingInline: '2vh',
		margin: '0%'
	}

	const textStyleLarge = {
		fontSize: '4.5vh',
		fontWeight: '700',
		textAlign: 'right',
		paddingInline: '2vh',
		margin: '0%'
	}

	return (
		<div className={`container ${styles.home}`}>
			<section
				className={`container-fluid  text-light`}
				style={{ margin: 'auto' }}>
				<div
					className="row "
					style={{
						margin: 'auto',
						display: 'flex',
						justifyContent: 'space-between'
					}}>
					{/* select company */}
					<div
						className={`col-md-auto ${styles.smallCard}`}
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
								companies?.find(comp => comp.cid === userCompanies[0]?.cid)
									?.name
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
									<option value={0} key={0}>
										All
									</option>
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
					{/* timer finished */}
					<div
						className={`col-md-auto ${styles.smallCard}`}
						style={{ backgroundColor: '#FFD700', color: 'darkblue' }}>
						<p style={{ marginBlock: 'auto', marginRight: 'auto' }}>Date :</p>
						<p
							style={{
								textAlign: 'left',
								marginBlock: 'auto',
								marginLeft: 'auto',

								fontWeight: 700
							}}>
							{formattedDate}
						</p>
					</div>
					<div
						className={`col-md-auto ${styles.smallCard}`}
						style={{
							position: 'relative',
							backgroundColor: ' #CCCCCC',
							color: 'darkblue'
						}}>
						<p
							style={{
								marginBlock: 'auto',
								marginRight: 'auto'
							}}>
							User :
						</p>
						<p
							style={{
								marginBlock: 'auto',
								marginRight: 'auto',
								fontWeight: 700
							}}>
							{currentUser?.name}
						</p>
						<FontAwesomeIcon
							className={styles.profileEditBtn}
							icon={faPen}
							style={{ color: 'darkblue' }}
							onClick={handlePasswordModel}
						/>
					</div>
					<div
						className={`col-md-auto ${styles.smallCard}`}
						style={{
							position: 'relative',
							backgroundColor: ' #FFFDD0',
							color: 'darkblue'
						}}>
						<p
							style={{
								textAlign: 'left',
								marginBlock: 'auto',
								marginRight: 'auto'
							}}>
							Opening Balance :
						</p>
						<p
							style={{
								marginLeft: 'auto',

								marginBlock: 'auto',
								fontWeight: 700
							}}>
							{openingBalance}
						</p>
					</div>
					{/* <div className={`row ${styles.smallCard}`}>
						<p className="col-12 col-md-5">Opening Balance</p>
						<p>Remaining Time: {formatTime(remainingTime)}</p>
					</div> */}
				</div>
			</section>

			{/* charts */}
			{currentUser.cp === 'yes' && (
				<div className="container-fluid my-3">
					<div className="row">
						<div className="col-md-6 col-12 my-2" style={{ margin: 'auto' }}>
							<h2 style={{ textAlign: 'left', color: 'white' }}>Pie Chart</h2>
							<div
								className={`col-12`}
								style={{
									minHeight: '50vh',
									height: chartHeight,
									backdropFilter: 'blur(16px) saturate(180%)',
									WebkitBackdropFilter: 'blur(16px) saturate(180%)',
									backgroundColor: ' rgba(86, 54, 186, 0.15)',
									borderRadius: '12px',
									border: '1px solid rgba(209, 213, 219, 0.3)'
								}}>
								<PieChart
									headDatas={[
										totalExpanses,
										totalIncomes,
										gotAdvance,
										paidAdvance,
										gotLoan,
										paidLoan
									]}
								/>
							</div>
						</div>

						<div className="col-md-6 col-12 my-2" style={{ margin: 'auto' }}>
							<h2 style={{ textAlign: 'left', color: 'white' }}>Line Chart</h2>
							<div
								className={`col-12`}
								style={{
									minHeight: '50vh',
									height: chartHeight,
									backdropFilter: 'blur(16px) saturate(180%)',
									WebkitBackdropFilter: 'blur(16px) saturate(180%)',
									backgroundColor: ' rgba(86, 54, 186, 0.15)',
									borderRadius: '12px',
									border: '1px solid rgba(209, 213, 219, 0.3)'
								}}>
								<LineChart
									expenses={expanses}
									receipts={receipts}
									requestList={requestList}
								/>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Cards */}
			<Container fluid>
				<Row
					style={{
						width: '100%',
						marginInline: 'auto',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						minWidth: '35vh'
					}}>
					{/* Profit */}
					<Col
						sm={12}
						md={4}
						lg={3}
						xl={2}
						className="m-1 text-bg-dark"
						style={cardStyle}>
						<p style={textStyleSmall} className=" text-center">
							Profit
						</p>

						<p style={textStyleLarge} className=" text-center">
							{totalIncomes - totalExpanses}
						</p>
					</Col>
					{/* Balance */}
					<Col
						sm={12}
						md={4}
						lg={3}
						xl={2}
						className="m-1 text-bg-danger"
						style={cardStyle}>
						<p style={textStyleSmall} className=" text-center">
							Balance
						</p>

						<p style={textStyleLarge} className=" text-center">
							{balance}
						</p>
					</Col>

					{/* Expenses */}
					<Col
						sm={12}
						md={4}
						lg={3}
						xl={2}
						className="m-1 text-bg-primary"
						style={cardStyle}>
						<Row>
							<p style={textStyleSmall} className=" text-center">
								Expenses
							</p>

							<p style={textStyleLarge} className=" text-center">
								{totalExpanses}
							</p>
						</Row>
					</Col>

					{/* Advance (Credit) */}
					<Col
						sm={12}
						md={4}
						lg={3}
						xl={2}
						className="m-1 text-bg-secondary"
						style={cardStyle}>
						<p style={textStyleSmall} className=" text-center">
							Advance (C)
						</p>

						<p style={textStyleLarge} className=" text-center">
							{gotAdvance}
						</p>
					</Col>

					{/* Advance (Debit) */}
					<Col
						sm={12}
						md={4}
						lg={3}
						xl={2}
						className="m-1 text-bg-warning"
						style={cardStyle}>
						<p style={textStyleSmall} className=" text-center">
							Advance (D)
						</p>

						<p style={textStyleLarge} className=" text-center">
							{paidAdvance}
						</p>
					</Col>
				</Row>
			</Container>
			{/* Cards */}
			<Container fluid>
				<Row
					style={{
						width: '100%',
						marginInline: 'auto',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						minWidth: '35vh'
					}}>
					<Col className="text-bg-light m-1 rounded">
						<p style={textStyleSmall} className=" text-center">
							Income
						</p>
						<p style={textStyleLarge} className=" text-center">
							{totalIncomes}
						</p>
					</Col>

					<Col
						className=" m-1 rounded"
						style={{ backgroundColor: 'red', color: 'white' }}>
						<p style={textStyleSmall} className=" text-center">
							Capital
						</p>
						<p style={textStyleLarge} className=" text-center">
							{captitalAmount}
						</p>
					</Col>
					<Col className="text-bg-info m-1 rounded">
						<p style={textStyleSmall} className=" text-center">
							Loan(C)
						</p>
						<p style={textStyleLarge} className=" text-center">
							{gotLoan}
						</p>
					</Col>

					<Col className="text-bg-success m-1 rounded">
						<p style={textStyleSmall} className=" text-center">
							Loans(D)
						</p>
						<p style={textStyleLarge} className=" text-center">
							{paidLoan}
						</p>
					</Col>
				</Row>
			</Container>

			<section className={`container-fluid mt-3`}>
				<h2 style={{ textAlign: 'left', color: 'white' }}>Account Works</h2>
				<div className={`col-12 `}>
					<SummaryTable
						list={requestList}
						handleModel={handleExpenseModel}
						currentUser={currentUser}
						companies={companies}
						userCompanies={userCompanies}
						selectedCompany={selectedCompany}
					/>
				</div>
			</section>

			{/* {showModal && (
				<SummeryModel
					clickedRow={clickedRow}
					showModal={showModal}
					closeHandler={handleExpenseModel}
					deleteHandler={deleteExpenseHandler}
					currentUser={currentUser}
					companies={companies}
					userCompanies={userCompanies}
					selectedCompany={selectedCompany}
				/>
			)} */}

			{showPasswordModel && (
				<ResetPasswordModel
					selectedUser={currentUser}
					showModal={showPasswordModel}
					closeHandler={handlePasswordModel}
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

export default Home
