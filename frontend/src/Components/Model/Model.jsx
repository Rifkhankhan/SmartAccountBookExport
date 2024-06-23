import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Button, Modal, Spinner } from 'react-bootstrap'
import styles from './Model.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faPager, faPen } from '@fortawesome/free-solid-svg-icons'
import man from './../../Images/man.png'
import { resetPassword, updateUser } from '../../Actions/userAction'
import { useDispatch, useSelector } from 'react-redux'
import { activateToggle } from '../../Actions/userAction'
import { getUserComponies } from '../../Actions/CompanyActions'
import Loading from '../Loading'
const Model = ({ showModal, closeHandler, selectedUser, companies }) => {
	const currentUser = useSelector(state => state.auth.user)
	const [showEditModal, setShowEditModal] = useState(false)
	const [formSubmit, setFormSubmit] = useState(false) // for response
	const [formValid, setFormValid] = useState(true)
	const userCompanies = useSelector(state => state.company.userCompanies)
	const [selectedOptions, setSelectedOptions] = useState([...userCompanies])

	console.log(selectedUser)
	const dispatch = useDispatch()

	useLayoutEffect(() => {
		if (selectedUser) {
			dispatch(getUserComponies(selectedUser?.id))
		}
	}, [selectedUser, dispatch])

	useLayoutEffect(() => {
		setSelectedOptions([...userCompanies])
	}, [showEditModal, userCompanies])

	// initialInputsState

	const initialInputsState = {
		name: { value: selectedUser?.name, isValid: true },
		company: { value: [], isValid: false },

		expansePermission: {
			value: selectedUser?.expansePermission,
			isValid: true
		},
		expanseEditPermission: {
			value: selectedUser?.expanseEditPermission,
			isValid: true
		},
		cp: {
			value: selectedUser?.cp,
			isValid: true
		},
		pp: {
			value: selectedUser?.pp,
			isValid: true
		},
		epp: {
			value: selectedUser?.epp,
			isValid: true
		},
		expanseDeletePermission: {
			value: selectedUser?.expanseDeletePermission,
			isValid: true
		},
		receiptPermission: {
			value: selectedUser?.receiptPermission,
			isValid: true
		},
		receiptEditPermission: {
			value: selectedUser?.receiptEditPermission,
			isValid: true
		},
		receiptDeletePermission: {
			value: selectedUser?.receiptDeletePermission,
			isValid: true
		},
		advancePermission: {
			value: selectedUser?.advancePermission,
			isValid: true
		},
		advanceEditPermission: {
			value: selectedUser?.advanceEditPermission,
			isValid: true
		},
		advanceDeletePermission: {
			value: selectedUser?.advanceDeletePermission,
			isValid: true
		},
		loanPermission: {
			value: selectedUser?.loanPermission,
			isValid: true
		},
		loanEditPermission: {
			value: selectedUser?.loanEditPermission,
			isValid: true
		},
		loanDeletePermission: {
			value: selectedUser?.loanDeletePermission,
			isValid: true
		},
		excelPermission: {
			value: selectedUser?.excelPermission,
			isValid: true
		}
	}

	const [inputs, setInputs] = useState(initialInputsState)
	useEffect(() => {
		setFormValid(inputs.name.isValid && selectedOptions.length > 0)
	}, [inputs, selectedOptions])

	const inputTextChangeHandler = (inputType, enteredValue) => {
		setInputs(currentInputValue => {
			return {
				...currentInputValue,
				[inputType]: { value: enteredValue, isValid: true }
			}
		})
	}

	const submitHandler = () => {
		const data = {
			name: inputs.name.value,
			company: selectedOptions,
			expansePermission: inputs.expansePermission.value,
			expanseEditPermission: inputs.expanseEditPermission.value,
			expanseDeletePermission: inputs.expanseDeletePermission.value,
			receiptPermission: inputs.receiptPermission.value,
			receiptDeletePermission: inputs.receiptDeletePermission.value,
			receiptEditPermission: inputs.receiptEditPermission.value,
			advancePermission:
				inputs.advancePermission.value === null
					? 'no'
					: inputs.advancePermission.value,
			cp: inputs.cp.value === null ? 'no' : inputs.cp.value,
			pp: inputs.pp.value === null ? 'no' : inputs.pp.value,
			epp: inputs.epp.value === null ? 'no' : inputs.epp.value,
			advanceDeletePermission:
				inputs.advanceDeletePermission.value === null
					? 'no'
					: inputs.advanceDeletePermission.value,
			advanceEditPermission:
				inputs.advanceEditPermission.value === null
					? 'no'
					: inputs.advanceEditPermission.value,
			loanPermission:
				inputs.loanPermission.value === null
					? 'no'
					: inputs.loanPermission.value,
			loanDeletePermission:
				inputs.loanDeletePermission.value === null
					? 'no'
					: inputs.loanDeletePermission.value,
			loanEditPermission:
				inputs.loanEditPermission.value === null
					? 'no'
					: inputs.loanEditPermission.value,
			excelPermission:
				inputs.excelPermission.value === null
					? 'no'
					: inputs.excelPermission.value
		}

		const nameValid = data.name?.trim().length > 0

		const companyValid = data.company?.length > 0

		if (!nameValid || !companyValid) {
			setInputs(currentInputs => {
				return {
					...currentInputs,
					name: { value: currentInputs.name.value, isValid: nameValid }
				}
			})

			return
		}

		dispatch(updateUser(selectedUser?.id, data))
		setFormSubmit(true)
		setShowEditModal(false)
		closeHandler()
		setInputs(initialInputsState)
	}

	// edit handler
	const editUserHandler = id => {
		setShowEditModal(current => !current)
	}
	const resetPasswordHandler = () => {
		dispatch(resetPassword(selectedUser?.id))
		closeHandler()
	}

	const blockHandler = () => {
		dispatch(activateToggle(selectedUser?.id))
		closeHandler()
	}

	const handleCheckboxChange = companyId => {
		setSelectedOptions(prevOptions => {
			if (!prevOptions.find(option => option.cid === companyId)) {
				return [...prevOptions, companies?.find(comp => comp.cid === companyId)]
			} else {
				return prevOptions.filter(option => option.cid !== companyId)
			}
		})
	}

	return (
		<>
			{!showEditModal && (
				<Modal show={showModal} onHide={closeHandler} centered size="lg">
					<Modal.Header
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							backgroundColor: '#7993d2'
						}}>
						<Modal.Title style={{ fontSize: '2em' }}>View Details</Modal.Title>
						<FontAwesomeIcon
							className={styles.editBtn}
							icon={faPen}
							onClick={() => editUserHandler(12)}
						/>
					</Modal.Header>
					<Modal.Body>
						<div className="row">
							<div className="col-12 col-md-6">
								<label
									style={{ fontWeight: 600, fontSize: '1.5em' }}
									className="col-12 col-md-12 ">
									Name
								</label>
								<p>{selectedUser?.name}</p>
							</div>
							<div className="col-12 col-md-6">
								<label
									style={{ fontWeight: 600, fontSize: '1.5em' }}
									className="col-12 col-md-12">
									Excel Permission
								</label>
								<p>
									{selectedUser?.excelPermission === 'yes'
										? 'Granted'
										: 'Denied'}
								</p>
							</div>
						</div>
						<div className="row">
							<div className="col-12 col-md-6">
								<label
									style={{ fontWeight: 600, fontSize: '1.5em' }}
									className="col-12 col-md-12">
									Expense Permission
								</label>
								<p>
									{selectedUser?.expansePermission === 'yes'
										? 'Granted'
										: 'Denied'}
								</p>
							</div>
							<div className="col-12 col-md-6">
								<label style={{ fontWeight: 600, fontSize: '1.5em' }}>
									Receipt Permission
								</label>
								<p>
									{selectedUser?.receiptPermission === 'yes'
										? 'Granted'
										: 'Denied'}
								</p>
							</div>
						</div>

						<div className="row">
							<div className="col-12 col-md-6">
								<label
									style={{ fontWeight: 600, fontSize: '1.5em' }}
									className="col-12 col-md-12">
									Advance Permission
								</label>
								<p>
									{selectedUser?.advancePermission === 'yes'
										? 'Granted'
										: 'Denied'}
								</p>
							</div>
							<div className="col-12 col-md-6">
								<label style={{ fontWeight: 600, fontSize: '1.5em' }}>
									Loan Permission
								</label>
								<p>
									{selectedUser?.loanPermission === 'yes'
										? 'Granted'
										: 'Denied'}
								</p>
							</div>
						</div>
						<div className="row">
							<div className="col-12 col-md-6">
								<label
									style={{ fontWeight: 600, fontSize: '1.5em' }}
									className="col-12 col-md-12">
									Expense Edit Permission
								</label>
								<p>
									{selectedUser?.expanseEditPermission === 'yes'
										? 'Granted'
										: 'Denied'}
								</p>
							</div>
							<div className="col-12 col-md-6">
								<label style={{ fontWeight: 600, fontSize: '1.5em' }}>
									Receipt Edit Permission
								</label>
								<p>
									{selectedUser?.receiptEditPermission === 'yes'
										? 'Granted'
										: 'Denied'}
								</p>
							</div>
						</div>
						<div className="row">
							<div className="col-12 col-md-6">
								<label
									style={{ fontWeight: 600, fontSize: '1.5em' }}
									className="col-12 col-md-12">
									Advance Edit Permission
								</label>
								<p>
									{selectedUser?.advanceEditPermission === 'yes'
										? 'Granted'
										: 'Denied'}
								</p>
							</div>
							<div className="col-12 col-md-6">
								<label style={{ fontWeight: 600, fontSize: '1.5em' }}>
									Loan Edit Permission
								</label>
								<p>
									{selectedUser?.loanEditPermission === 'yes'
										? 'Granted'
										: 'Denied'}
								</p>
							</div>
						</div>
						<div className="row">
							<div className="col-12 col-md-6">
								<label
									style={{ fontWeight: 600, fontSize: '1.5em' }}
									className="col-12 col-md-12">
									Expense Delete Permission
								</label>
								<p>
									{selectedUser?.expanseDeletePermission === 'yes'
										? 'Granted'
										: 'Denied'}
								</p>
							</div>
							<div className="col-12 col-md-6">
								<label style={{ fontWeight: 600, fontSize: '1.5em' }}>
									Receipt Delete Permission
								</label>
								<p>
									{selectedUser?.receiptDeletePermission === 'yes'
										? 'Granted'
										: 'Denied'}
								</p>
							</div>
						</div>
						<div className="row">
							<div className="col-12 col-md-6">
								<label
									style={{ fontWeight: 600, fontSize: '1.5em' }}
									className="col-12 col-md-12">
									Advance Delete Permission
								</label>
								<p>
									{selectedUser?.advanceDeletePermission === 'yes'
										? 'Granted'
										: 'Denied'}
								</p>
							</div>
							<div className="col-12 col-md-6">
								<label style={{ fontWeight: 600, fontSize: '1.5em' }}>
									Loan Delete Permission
								</label>
								<p>
									{selectedUser?.loanDeletePermission === 'yes'
										? 'Granted'
										: 'Denied'}
								</p>
							</div>
						</div>
						<div className="row">
							<div className="col-12 col-md-6">
								<label
									style={{ fontWeight: 600, fontSize: '1.5em' }}
									className="col-12 col-md-12">
									Print Permission
								</label>
								<p>{selectedUser?.pp === 'yes' ? 'Granted' : 'Denied'}</p>
							</div>
							<div className="col-12 col-md-6">
								<label style={{ fontWeight: 600, fontSize: '1.5em' }}>
									Export PDF Permission
								</label>
								<p>{selectedUser?.epp === 'yes' ? 'Granted' : 'Denied'}</p>
							</div>
						</div>
						<div className="row">
							<div className="col-12 col-md-6">
								<label
									style={{ fontWeight: 600, fontSize: '1.5em' }}
									className="col-12 col-md-12">
									Chart Access Permission
								</label>
								<p>{selectedUser?.cp === 'yes' ? 'Granted' : 'Denied'}</p>
							</div>

							{companies && userCompanies && selectedUser ? (
								<div
									className="form-group col-12 col-md-6 mb-2"
									style={{
										maxHeight: '100px',
										overflowY: 'auto',
										overflowX: 'hidden'
									}}>
									{selectedUser && userCompanies?.length > 0
										? userCompanies?.map(company => (
												<div key={company.cid} className="form-check">
													<input
														className="form-check-input"
														type="checkbox"
														id={`company_${company.cid}`}
														value={company.cid}
														checked
														style={{ display: 'block', marginRight: '5px' }}
													/>
													<label
														className="form-check-label text-dark text-left"
														htmlFor={`company_${company.cid}`}
														style={{ textAlign: 'left' }}>
														{
															companies?.find(comp => comp.cid === company.cid)
																.name
														}
													</label>
												</div>
										  ))
										: companies?.map(company => (
												<div key={company.cid} className="form-check">
													<input
														className="form-check-input"
														type="checkbox"
														id={`company_${company.cid}`}
														value={company.cid}
														checked={false}
														style={{ display: 'block', marginRight: '5px' }}
													/>
													<label
														className="form-check-label text-dark text-left"
														htmlFor={`company_${company.cid}`}
														style={{ textAlign: 'left' }}>
														{
															companies?.find(comp => comp.cid === company.cid)
																.name
														}
													</label>
												</div>
										  ))}
								</div>
							) : (
								<Loading />
							)}
						</div>
					</Modal.Body>
					<Modal.Footer
						className="row mx-1"
						style={{ display: 'flex', justifyContent: 'space-between' }}>
						{currentUser?.isAdmin ? (
							<Button
								variant="dark"
								className="col-12 col-md-2"
								onClick={blockHandler}>
								{selectedUser.status ? 'Block' : 'Activate'}
							</Button>
						) : (
							''
						)}
						<Button
							variant="primary"
							onClick={resetPasswordHandler}
							className="col-12 col-md-5">
							Reset Password
						</Button>
						<Button
							variant="secondary"
							onClick={closeHandler}
							className="col-12 col-md-2">
							Close
						</Button>
					</Modal.Footer>
				</Modal>
			)}

			{showEditModal && (
				<Modal show={showModal} onHide={closeHandler} centered size="lg">
					<Modal.Header
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							backgroundColor: !formValid ? 'red' : '#7993d2'
						}}>
						<Modal.Title style={{ fontSize: '2em' }}>Edit User</Modal.Title>
						<FontAwesomeIcon
							className={styles.editBtn}
							icon={faClose}
							onClick={closeHandler}
						/>
					</Modal.Header>
					{!formValid && (
						<div
							className="row "
							style={{ paddingBlock: '0px', marginBlock: '0px' }}>
							<p
								className="text-danger text-capitalize  "
								style={{
									fontSize: '3vh',
									textAlign: 'center',
									paddingBlock: '0px',
									marginBlock: '0px'
								}}>
								Invalid Data Please check!
							</p>
						</div>
					)}
					<Modal.Body
						style={{
							marginTop: '0px',
							marginBlock: '0px',
							paddingBlock: '0px'
						}}>
						<div className="row">
							<div className="col-12 col-md-6" style={{ marginBlock: '1vh' }}>
								<label
									style={{ fontWeight: 600, fontSize: '1.3em' }}
									className="col-12 col-md-12 ">
									Name
								</label>
								<input
									placeholder="Example@gmail.com"
									value={inputs.name.value}
									onChange={e => inputTextChangeHandler('name', e.target.value)}
									className="form-control col-12 col-md-6"
									style={{ border: '2px solid blue' }}
								/>
							</div>

							<div className="col-12 col-md-6" style={{ marginBlock: '1vh' }}>
								<label
									style={{ fontWeight: 600, fontSize: '1.3em' }}
									className="col-12 col-md-6">
									Excel Permission
								</label>
								<select
									class="form-control"
									style={{ border: '2px solid blue' }}
									value={inputs.excelPermission?.value}
									onChange={e =>
										inputTextChangeHandler('excelPermission', e.target.value)
									}
									id="inputGroupSelect01">
									<option
										value="yes"
										selected={inputs.excelPermission?.value === 'yes'}>
										Yes
									</option>

									<option
										value="no"
										selected={inputs.excelPermission?.value === 'no'}>
										No
									</option>
								</select>
							</div>
						</div>

						<div className="row">
							<div className="col-12 col-md-6" style={{ marginBlock: '1vh' }}>
								<label
									style={{ fontWeight: 600, fontSize: '1.3em' }}
									className="col-12 col-md-6">
									Expense Permission
								</label>
								<select
									class="form-control"
									style={{ border: '2px solid blue' }}
									value={inputs.expansePermission?.value}
									onChange={e =>
										inputTextChangeHandler('expansePermission', e.target.value)
									}
									id="inputGroupSelect01">
									<option
										value="yes"
										selected={inputs.expansePermission?.value === 'yes'}>
										Yes
									</option>

									<option
										value="no"
										selected={inputs.expansePermission?.value === 'no'}>
										No
									</option>
								</select>
							</div>
							<div className="col-12 col-md-6" style={{ marginBlock: '1vh' }}>
								<label
									style={{ fontWeight: 600, fontSize: '1.3em' }}
									className="col-12 col-md-6">
									Receipt Permission
								</label>
								<select
									class="form-control"
									style={{ border: '2px solid blue' }}
									value={inputs.receiptPermission?.value}
									onChange={e =>
										inputTextChangeHandler('receiptPermission', e.target.value)
									}
									id="inputGroupSelect01">
									<option
										value="yes"
										selected={inputs.receiptPermission?.value === 'yes'}>
										Yes
									</option>
									<option
										value="no"
										selected={inputs.receiptPermission?.value === 'no'}>
										No
									</option>
								</select>
							</div>
						</div>
						<div className="row">
							<div className="col-12 col-md-6" style={{ marginBlock: '1vh' }}>
								<label
									style={{ fontWeight: 600, fontSize: '1.3em' }}
									className="col-12 col-md-6">
									Advance Permission
								</label>
								<select
									class="form-control"
									style={{ border: '2px solid blue' }}
									value={inputs.advancePermission?.value}
									onChange={e =>
										inputTextChangeHandler('advancePermission', e.target.value)
									}
									id="inputGroupSelect01">
									<option
										value="yes"
										selected={inputs.advancePermission?.value === 'yes'}>
										Yes
									</option>

									<option
										value="no"
										selected={inputs.advancePermission?.value === 'no'}>
										No
									</option>
								</select>
							</div>
							<div className="col-12 col-md-6" style={{ marginBlock: '1vh' }}>
								<label
									style={{ fontWeight: 600, fontSize: '1.3em' }}
									className="col-12 col-md-6">
									Loan Permission
								</label>
								<select
									class="form-control"
									style={{ border: '2px solid blue' }}
									value={inputs.loanPermission?.value}
									onChange={e =>
										inputTextChangeHandler('loanPermission', e.target.value)
									}
									id="inputGroupSelect01">
									<option
										value="yes"
										selected={inputs.loanPermission?.value === 'yes'}>
										Yes
									</option>
									<option
										value="no"
										selected={inputs.loanPermission?.value === 'no'}>
										No
									</option>
								</select>
							</div>
						</div>

						<div className="row">
							<div className="col-12 col-md-6" style={{ marginBlock: '1vh' }}>
								<label
									style={{ fontWeight: 600, fontSize: '1.3em' }}
									className="col-12 col-md-12">
									Expense Edit Permission
								</label>
								<select
									class="form-control"
									style={{ border: '2px solid blue' }}
									value={inputs.expanseEditPermission?.value}
									onChange={e =>
										inputTextChangeHandler(
											'expanseEditPermission',
											e.target.value
										)
									}
									id="inputGroupSelect01">
									<option
										value="yes"
										selected={inputs.expanseEditPermission?.value === 'yes'}>
										Yes
									</option>
									<option
										value="no"
										selected={inputs.expanseEditPermission?.value === 'no'}>
										No
									</option>
								</select>
							</div>
							<div className="col-12 col-md-6" style={{ marginBlock: '1vh' }}>
								<label
									style={{ fontWeight: 600, fontSize: '1.3em' }}
									className="col-12 col-md-12">
									Receipt Edit Permission
								</label>
								<select
									class="form-control"
									style={{ border: '2px solid blue' }}
									value={inputs.receiptEditPermission?.value}
									onChange={e =>
										inputTextChangeHandler(
											'receiptEditPermission',
											e.target.value
										)
									}
									id="inputGroupSelect01">
									<option
										value="yes"
										selected={inputs.receiptEditPermission?.value === 'yes'}>
										Yes
									</option>
									<option
										value="no"
										selected={inputs.receiptEditPermission?.value === 'no'}>
										No
									</option>
								</select>
							</div>
						</div>

						<div className="row">
							<div className="col-12 col-md-6" style={{ marginBlock: '1vh' }}>
								<label
									style={{ fontWeight: 600, fontSize: '1.3em' }}
									className="col-12 col-md-12">
									Advance Edit Permission
								</label>
								<select
									class="form-control"
									style={{ border: '2px solid blue' }}
									value={inputs.advanceEditPermission?.value}
									onChange={e =>
										inputTextChangeHandler(
											'advanceEditPermission',
											e.target.value
										)
									}
									id="inputGroupSelect01">
									<option
										value="yes"
										selected={inputs.advanceEditPermission?.value === 'yes'}>
										Yes
									</option>
									<option
										value="no"
										selected={inputs.advanceEditPermission?.value === 'no'}>
										No
									</option>
								</select>
							</div>
							<div className="col-12 col-md-6" style={{ marginBlock: '1vh' }}>
								<label
									style={{ fontWeight: 600, fontSize: '1.3em' }}
									className="col-12 col-md-12">
									Loan Edit Permission
								</label>
								<select
									class="form-control"
									style={{ border: '2px solid blue' }}
									value={inputs.loanEditPermission?.value}
									onChange={e =>
										inputTextChangeHandler('loanEditPermission', e.target.value)
									}
									id="inputGroupSelect01">
									<option
										value="yes"
										selected={inputs.loanEditPermission?.value === 'yes'}>
										Yes
									</option>
									<option
										value="no"
										selected={inputs.loanEditPermission?.value === 'no'}>
										No
									</option>
								</select>
							</div>
						</div>

						<div className="row">
							<div className="col-12 col-md-6" style={{ marginBlock: '1vh' }}>
								<label
									style={{ fontWeight: 600, fontSize: '1.3em' }}
									className="col-12 col-md-12">
									Expense Delete Permission
								</label>
								<select
									class="form-control"
									style={{ border: '2px solid blue' }}
									value={inputs.expanseDeletePermission?.value}
									onChange={e =>
										inputTextChangeHandler(
											'expanseDeletePermission',
											e.target.value
										)
									}
									id="inputGroupSelect01">
									<option
										value="yes"
										selected={inputs.expanseDeletePermission?.value === 'yes'}>
										Yes
									</option>

									<option
										value="no"
										selected={inputs.expanseDeletePermission?.value === 'no'}>
										No
									</option>
								</select>
							</div>
							<div className="col-12 col-md-6" style={{ marginBlock: '1vh' }}>
								<label
									style={{ fontWeight: 600, fontSize: '1.3em' }}
									className="col-12 col-md-12">
									Receipt Delete Permission
								</label>
								<select
									class="form-control"
									style={{ border: '2px solid blue' }}
									value={inputs.receiptDeletePermission?.value}
									onChange={e =>
										inputTextChangeHandler(
											'receiptDeletePermission',
											e.target.value
										)
									}
									id="inputGroupSelect01">
									<option
										value="yes"
										selected={inputs.receiptDeletePermission?.value === 'yes'}>
										Yes
									</option>
									<option
										value="no"
										selected={inputs.receiptDeletePermission?.value === 'no'}>
										No
									</option>
								</select>
							</div>
						</div>

						<div className="row">
							<div className="col-12 col-md-6" style={{ marginBlock: '1vh' }}>
								<label
									style={{ fontWeight: 600, fontSize: '1.3em' }}
									className="col-12 col-md-12">
									Advance Delete Permission
								</label>
								<select
									class="form-control"
									style={{ border: '2px solid blue' }}
									value={inputs.advanceDeletePermission?.value}
									onChange={e =>
										inputTextChangeHandler(
											'advanceDeletePermission',
											e.target.value
										)
									}
									id="inputGroupSelect01">
									<option
										value="yes"
										selected={inputs.advanceDeletePermission?.value === 'yes'}>
										Yes
									</option>

									<option
										value="no"
										selected={inputs.advanceDeletePermission?.value === 'no'}>
										No
									</option>
								</select>
							</div>
							<div className="col-12 col-md-6" style={{ marginBlock: '1vh' }}>
								<label
									style={{ fontWeight: 600, fontSize: '1.3em' }}
									className="col-12 col-md-12">
									Loan Delete Permission
								</label>
								<select
									class="form-control"
									style={{ border: '2px solid blue' }}
									value={inputs.loanDeletePermission?.value}
									onChange={e =>
										inputTextChangeHandler(
											'loanDeletePermission',
											e.target.value
										)
									}
									id="inputGroupSelect01">
									<option
										value="yes"
										selected={inputs.loanDeletePermission?.value === 'yes'}>
										Yes
									</option>
									<option
										value="no"
										selected={inputs.loanDeletePermission?.value === 'no'}>
										No
									</option>
								</select>
							</div>
						</div>
						<div className="row">
							<div className="col-12 col-md-6" style={{ marginBlock: '1vh' }}>
								<label
									style={{ fontWeight: 600, fontSize: '1.3em' }}
									className="col-12 col-md-12">
									Print Permission
								</label>
								<select
									class="form-control"
									style={{ border: '2px solid blue' }}
									value={inputs.pp?.value}
									onChange={e => inputTextChangeHandler('pp', e.target.value)}
									id="inputGroupSelect01">
									<option value="yes" selected={inputs.pp?.value === 'yes'}>
										Yes
									</option>

									<option value="no" selected={inputs.pp?.value === 'no'}>
										No
									</option>
								</select>
							</div>
							<div className="col-12 col-md-6" style={{ marginBlock: '1vh' }}>
								<label
									style={{ fontWeight: 600, fontSize: '1.3em' }}
									className="col-12 col-md-12">
									Export PDF Permission
								</label>
								<select
									class="form-control"
									style={{ border: '2px solid blue' }}
									value={inputs.epp?.value}
									onChange={e => inputTextChangeHandler('epp', e.target.value)}
									id="inputGroupSelect01">
									<option value="yes" selected={inputs.epp?.value === 'yes'}>
										Yes
									</option>
									<option value="no" selected={inputs.epp?.value === 'no'}>
										No
									</option>
								</select>
							</div>
						</div>
						<div className="row">
							<div className="col-12 col-md-6" style={{ marginBlock: '1vh' }}>
								<label
									style={{ fontWeight: 600, fontSize: '1.3em' }}
									className="col-12 col-md-12">
									Chart Access Permission
								</label>
								<select
									class="form-control"
									style={{ border: '2px solid blue' }}
									value={inputs.cp?.value}
									onChange={e => inputTextChangeHandler('cp', e.target.value)}
									id="inputGroupSelect01">
									<option value="yes" selected={inputs.cp?.value === 'yes'}>
										Yes
									</option>

									<option value="no" selected={inputs.cp?.value === 'no'}>
										No
									</option>
								</select>
							</div>

							<div
								className="form-group col-12 col-md-6 mb-2"
								style={{
									maxHeight: '100px',
									overflowY: 'auto',
									overflowX: 'hidden'
								}}>
								{companies.map(company => (
									<div key={company.cid} className="form-check">
										<input
											className="form-check-input"
											type="checkbox"
											id={`company_${company.cid}`}
											value={company.cid}
											checked={selectedOptions.some(option => {
												return option.cid === company.cid
											})}
											onChange={() => handleCheckboxChange(company.cid)}
											style={{ display: 'block', marginRight: '5px' }}
										/>
										<label
											className="form-check-label text-dark text-left"
											htmlFor={`company_${company.cid}`}
											style={{
												textAlign: 'left'
											}}>
											{company.name}
										</label>
									</div>
								))}
							</div>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="primary" onClick={submitHandler}>
							Submit
						</Button>
					</Modal.Footer>
				</Modal>
			)}
		</>
	)
}

export default Model
