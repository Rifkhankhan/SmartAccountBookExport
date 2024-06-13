import React, { useEffect, useLayoutEffect, useState } from 'react'
import styles from './Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Row, Col } from 'react-bootstrap'

import {
	faBank,
	faCreditCard,
	faDollar,
	faHandHolding,
	faMoneyBill,
	faMoneyBillTransfer,
	faMoneyBillTrendUp,
	faPen,
	faPiggyBank,
	faHeart
} from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'

import ResetPasswordModel from '../../Components/ResetPasswordModel/ResetPasswordModel'
import PieChart from '../../Components/PieChart/PieChart'
import LineChart from '../../Components/LineChart/LineChart'
import { deleteAccountRequest } from '../../Actions/AccountRequestActions'
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner'
import { authActions } from '../../store/AuthSlice'
import SummaryTable from '../../Components/SummaryTable/SummaryTable'
// import SummeryModel from '../../Components/SummeryModel/SummeryModel'
// import { getUsers } from '../../Actions/userAction'

const Timer = ({ onTimeout }) => {
	const initialTimeLeft = localStorage.getItem('timeLeft') || 3600
	const [timeLeft, setTimeLeft] = useState(parseInt(initialTimeLeft))
	useEffect(() => {
		const interval = setInterval(() => {
			if (timeLeft > 0) {
				setTimeLeft(prevTimeLeft => prevTimeLeft - 1)
			} else {
				clearInterval(interval)
				onTimeout() // Call the logout function when timer expires
			}
		}, 1000)

		return () => clearInterval(interval)
	}, [timeLeft, onTimeout])

	useEffect(() => {
		localStorage.setItem('timeLeft', timeLeft)
	}, [timeLeft])

	const formatTime = time => {
		const minutes = Math.floor(time / 60)
		const seconds = time % 60
		return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
	}

	return <div>: {formatTime(timeLeft)}</div>
}
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
	const dispatch = useDispatch()
	const userCompanies = useSelector(state => state.company.userCompanies)

	const companies = useSelector(state => state.company.companies)

	const [showModal, setShowModal] = useState(false)
	const [clickedRow, setClickedRow] = useState({})

	const today = new Date()
	const formattedDate = today.toLocaleDateString('en-GB') // Format: dd/mm/yyyy
	const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
	const [selectedCompany, setSelectedCompany] = useState(1)

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
		getOpeningBalance(requestList)
		getTotalExpenseAmount(requestList)
		getTotalIncomeAmount(requestList)
		getTotalAdvanceAmount(requestList)
		getTotalLoanAmount(requestList)
		getBalance(requestList)
	}, [requestList])

	const getOpeningBalance = list => {
		const today = new Date()
		const yesterday = new Date(today)
		yesterday.setDate(today.getDate() - 1)
		const formattedYesterday = yesterday.toISOString().split('T')[0]

		// Filter list to get entries before yesterday
		const beforeYesterdayList = list.filter(li => {
			const currentDate = new Date(li.date).toISOString().split('T')[0]
			return currentDate <= formattedYesterday
		})

		const totalAmountBeforeYesterday = beforeYesterdayList.reduce(
			(total, current) => {
				if (
					current.requestForm === 'got' ||
					current.requestType === 'receipt'
				) {
					return total + parseFloat(current.amount)
				} else {
					return total - parseFloat(current.amount)
				}
			},
			0
		)

		setOpeningBalance(totalAmountBeforeYesterday)
	}

	const getBalance = list => {
		const today = new Date()
		const yesterday = new Date(today)
		yesterday.setDate(today.getDate() - 1)

		const totalAmountBeforeYesterday = list.reduce((total, current) => {
			if (current.requestForm === 'got' || current.requestType === 'receipt') {
				return total + parseFloat(current.amount)
			} else {
				return total - parseFloat(current.amount)
			}
		}, 0)

		setBalance(totalAmountBeforeYesterday)
	}
	const getTotalExpenseAmount = expanses => {
		// calculate total expenses

		const totalExpanses = expanses.reduce((total, current) => {
			if (current.requestForm === 'expense') {
				return total + +current.amount
			}
			return total // Make sure to return total even if the condition isn't met
		}, 0)
		setTotalExpanses(totalExpanses)
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

		setTotalIncomes(totalIncomes)
		setCapitalAmount(totalCapital)
	}

	const getTotalAdvanceAmount = advances => {
		// calculate total expenses

		const totalPaidAdvance = advances.reduce((total, current) => {
			if (current.requestForm === 'paid' && current.requestType === 'advance') {
				return total + +current.amount
			}
			return total // Make sure to return total even if the condition isn't met
		}, 0)

		const totalGotAdvance = advances.reduce((total, current) => {
			if (current.requestForm === 'got' && current.requestType === 'advance') {
				return total + +current.amount
			}
			return total // Make sure to return total even if the condition isn't met
		}, 0)

		setPaidAdvance(totalPaidAdvance)
		setGotAdvance(totalGotAdvance)
	}

	const getTotalLoanAmount = advances => {
		// calculate total expenses

		const totalPaidLoan = advances.reduce((total, current) => {
			if (current.requestForm === 'paid' && current.requestType === 'loan') {
				return total + +current.amount
			}
			return total // Make sure to return total even if the condition isn't met
		}, 0)

		const totalGotLoan = advances.reduce((total, current) => {
			if (current.requestForm === 'got' && current.requestType === 'loan') {
				return total + +current.amount
			}
			return total // Make sure to return total even if the condition isn't met
		}, 0)

		setPaidLoan(totalPaidLoan)
		setGotLoan(totalGotLoan)
	}
	const handleExpenseModel = row => {
		setClickedRow(row)
		setShowModal(current => !current)
	}

	const deleteExpenseHandler = id => {
		setShowModal(current => !current)
		dispatch(deleteAccountRequest(id))
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

	// set timer

	const [remainingTime, setRemainingTime] = useState(0)

	useEffect(() => {
		if (isAuthenticated) {
			const savedTime = localStorage.getItem('loginTime')
			const savedRemainingTime = parseInt(
				localStorage.getItem('remainingTime'),
				10
			)
			const currentTime = new Date().getTime()
			const elapsedTime = (currentTime - parseInt(savedTime, 10)) / 1000

			const newRemainingTime = Math.max(savedRemainingTime - elapsedTime, 0)

			const interval = setInterval(() => {
				setRemainingTime(prevTime => Math.max(prevTime - 1, 0))
			}, 1000)
			setRemainingTime(newRemainingTime)

			return () => clearInterval(interval)
		}
	}, [])

	useEffect(() => {
		if (isAuthenticated) {
			const interval = setInterval(() => {
				setRemainingTime(prevTime => Math.max(prevTime - 1, 0))
			}, 1000)

			return () => clearInterval(interval)
		}
	}, [isAuthenticated])
	// Format remaining time into minutes and seconds
	const formatTime = () => {
		const minutes = Math.floor(remainingTime / 60)
		const seconds = remainingTime % 60
		return `${minutes.toString().padStart(2, '0')}:${seconds
			.toString()
			.padStart(2, '0')}`
	}

	// timer logout
	const handleLogout = () => {
		// Clear remaining time on logout

		dispatch(authActions.logout())
	}

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
					{/* times */}
					{/* <div
						className={`col-md-auto ${styles.smallCard}`}
						style={{
							backgroundColor: 'red',
							color: 'white',
							display: 'flex',
							alignItems: 'center',
							fontSize: '1em'
						}}>
						<p className="col-6" style={{ marginBlock: 'auto' }}>
							Remaining Time{' '}
						</p>
						<p
							style={{
								marginBlock: 'auto',
								textAlign: 'left',
								fontSize: '1.5em',
								fontWeight: 600
							}}>
							{/* <Countdown
								className="col-6"
								date={Date.now() + 3600000} // 1 hour from now in milliseconds
								onComplete={handleLogout}
								renderer={({ hours, minutes, seconds, completed }) => {
									if (completed) {
										return <span>Logging out...</span>
									} else {
										return (
											<span>
												{hours}:{minutes}:{seconds}
											</span>
										)
									}
								}}
							/>

							<Timer onTimeout={handleLogout} />
						</p>
					</div> */}

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
								companies?.find(comp => comp.cid === userCompanies[0]?.cid)?.name
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
					<Col sm={12} md={4} lg={3} xl={2} className="m-1" style={cardStyle}>
						<Row>
							<Col xs={1} className="my-auto">
								<FontAwesomeIcon
									icon={faHeart}
									fontSize="8vh"
									color="darkblue"
								/>
							</Col>
							<Col xs={10} className="ms-auto">
								<Row>
									<p style={textStyleSmall}>Profit</p>
								</Row>
								<Row>
									<p style={textStyleLarge}>{totalIncomes - totalExpanses}</p>
								</Row>
							</Col>
						</Row>
					</Col>
					{/* Balance */}
					<Col sm={12} md={4} lg={3} xl={2} className="m-1" style={cardStyle}>
						<Row>
							<Col xs={1} className="my-auto">
								<FontAwesomeIcon
									icon={faHandHolding}
									fontSize="8vh"
									color="darkblue"
								/>
							</Col>
							<Col xs={10} className="ms-auto">
								<Row>
									<p style={textStyleSmall}>Balance</p>
								</Row>
								<Row>
									<p style={textStyleLarge}>{balance}</p>
								</Row>
							</Col>
						</Row>
					</Col>

					{/* Expenses */}
					<Col sm={12} md={4} lg={3} xl={2} className="m-1" style={cardStyle}>
						<Row>
							<Col xs={1} className="my-auto">
								<FontAwesomeIcon
									icon={faMoneyBill}
									fontSize="8vh"
									color="darkblue"
								/>
							</Col>
							<Col xs={10} className="ms-auto">
								<Row>
									<p style={textStyleSmall}>Expenses</p>
								</Row>
								<Row>
									<p style={textStyleLarge}>{totalExpanses}</p>
								</Row>
							</Col>
						</Row>
					</Col>

					{/* Advance (Credit) */}
					<Col sm={12} md={4} lg={3} xl={2} className="m-1" style={cardStyle}>
						<Row>
							<Col xs={1} className="my-auto">
								<FontAwesomeIcon
									icon={faMoneyBillTransfer}
									fontSize="8vh"
									color="darkblue"
								/>
							</Col>
							<Col xs={10} className="ms-auto">
								<Row>
									<p style={textStyleSmall}>Advance (C)</p>
								</Row>
								<Row>
									<p style={textStyleLarge}>{gotAdvance}</p>
								</Row>
							</Col>
						</Row>
					</Col>

					{/* Advance (Debit) */}
					<Col sm={12} md={4} lg={3} xl={2} className="m-1" style={cardStyle}>
						<Row>
							<Col xs={1} className="my-auto">
								<FontAwesomeIcon
									icon={faMoneyBillTrendUp}
									fontSize="8vh"
									color="darkblue"
								/>
							</Col>
							<Col xs={10} className="ms-auto">
								<Row>
									<p style={textStyleSmall}>Advance (D)</p>
								</Row>
								<Row>
									<p style={textStyleLarge}>{paidAdvance}</p>
								</Row>
							</Col>
						</Row>
					</Col>
				</Row>
			</Container>
			{/* Cards */}
			<div className="container-fluid" style={{ marginInline: 'auto' }}>
				<div
					className="row"
					style={{
						width: '100%',
						marginInline: 'auto',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						minWidth: '35vh'
					}}>
					<div
						className=" col-md-auto col-12 m-1"
						style={{
							background: 'white',
							backdropFilter: 'blur(20px) saturate(113%)',
							WebkitBackdropFilter: 'blur(20px) saturate(113%)',
							backgroundColor: 'rgba(255, 255, 255, 200)',

							borderRadius: '12px',
							border: '1px solid rgba(209, 213, 219, 0.3)'
						}}>
						<div
							className="row"
							style={{ height: '75%', position: 'relative' }}>
							<FontAwesomeIcon
								icon={faDollar}
								fontSize="8vh"
								width="105px"
								color="darkblue"
								style={{
									margin: 'auto'
								}}
								className="col"
							/>
							<div className="col" style={{ margin: 'auto' }}>
								<p
									style={{
										fontSize: '3vh',

										textAlign: 'right',
										height: '30%',
										paddingInline: '2vh',
										margin: '0%'
									}}>
									Income
								</p>
								<p
									style={{
										fontSize: '4.5vh',
										fontWeight: '700',
										textAlign: 'right',
										paddingInline: '2vh',

										margin: '0%'
									}}>
									{totalIncomes}
								</p>
							</div>
						</div>
					</div>
					<div
						className=" col-md-auto col-12 m-1"
						style={{
							background: 'white',
							backdropFilter: 'blur(20px) saturate(113%)',
							WebkitBackdropFilter: 'blur(20px) saturate(113%)',
							backgroundColor: 'rgba(255, 255, 255, 200)',

							borderRadius: '12px',
							border: '1px solid rgba(209, 213, 219, 0.3)'
						}}>
						<div
							className="row"
							style={{ height: '75%', position: 'relative' }}>
							<FontAwesomeIcon
								icon={faCreditCard}
								fontSize="8vh"
								color="darkblue"
								style={{
									margin: 'auto'
								}}
								className="col"
							/>
							<div className="col" style={{ margin: 'auto' }}>
								<p
									style={{
										fontSize: '3vh',

										textAlign: 'right',
										height: '30%',
										paddingInline: '2vh',
										margin: '0%'
									}}>
									Capital
								</p>
								<p
									style={{
										fontSize: '4.5vh',
										fontWeight: '700',
										textAlign: 'right',
										paddingInline: '2vh',

										margin: '0%'
									}}>
									{captitalAmount}
								</p>
							</div>
						</div>
					</div>
					<div
						className=" col-md-auto col-12 m-1"
						style={{
							background: 'white',
							backdropFilter: 'blur(20px) saturate(113%)',
							WebkitBackdropFilter: 'blur(20px) saturate(113%)',
							backgroundColor: 'rgba(255, 255, 255, 200)',

							borderRadius: '12px',
							border: '1px solid rgba(209, 213, 219, 0.3)'
						}}>
						<div
							className="row"
							style={{ height: '75%', position: 'relative' }}>
							<FontAwesomeIcon
								icon={faPiggyBank}
								fontSize="8vh"
								color="darkblue"
								style={{
									margin: 'auto'
								}}
								className="col"
							/>
							<div className="col" style={{ margin: 'auto' }}>
								<p
									style={{
										fontSize: '3vh',

										textAlign: 'right',
										height: '30%',
										paddingInline: '2vh',
										margin: '0%'
									}}>
									Loan(Credit)
								</p>
								<p
									style={{
										fontSize: '4.5vh',
										fontWeight: '700',
										textAlign: 'right',
										paddingInline: '2vh',

										margin: '0%'
									}}>
									{gotLoan}
								</p>
							</div>
						</div>
					</div>

					<div
						className=" col-md-auto col-12 m-1"
						style={{
							background: 'white',

							backdropFilter: 'blur(20px) saturate(113%)',
							WebkitBackdropFilter: 'blur(20px) saturate(113%)',
							backgroundColor: 'rgba(255, 255, 255, 200)',

							borderRadius: '12px',
							border: '1px solid rgba(209, 213, 219, 0.3)'
						}}>
						<div
							className="row"
							style={{ height: '75%', position: 'relative' }}>
							<FontAwesomeIcon
								icon={faBank}
								fontSize="8vh"
								color="darkblue"
								style={{
									margin: 'auto'
								}}
								className="col"
							/>
							<div className="col" style={{ margin: 'auto' }}>
								<p
									style={{
										fontSize: '3vh',

										textAlign: 'right',
										height: '30%',
										paddingInline: '2vh',
										margin: '0%'
									}}>
									Loans(Debit)
								</p>
								<p
									style={{
										fontSize: '4.5vh',
										fontWeight: '700',
										textAlign: 'right',
										paddingInline: '2vh',

										margin: '0%'
									}}>
									{paidLoan}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

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
