import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import styles from './ResetPasswordModel.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faPen } from '@fortawesome/free-solid-svg-icons'
import { updateReceipt } from '../../Actions/ReceiptActions'
import { useDispatch, useSelector } from 'react-redux'
import { updateLoan } from '../../Actions/LoanActions'
import { updatePassword, updateUser } from '../../Actions/userAction'

const ResetPasswordModel = ({ selectedUser, showModal, closeHandler }) => {
	const currentUser = useSelector(state => state.auth.user)
	const [showEditModal, setShowEditModal] = useState(false)
	const [formSubmit, setFormSubmit] = useState(false)
	const [formValid, setFormValid] = useState(true)
	const dispatch = useDispatch()
	// initialInputsState
	const initialInputsState = {
		password: {
			value: '',
			isValid: true
		}
	}

	const [inputs, setInputs] = useState(initialInputsState)

	useEffect(() => {
		setFormValid(inputs.password.isValid)

		return () => {}
	}, [inputs])

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
			password: inputs.password.value
		}

		const passowrdValid = data.password?.trim().length >= 6

		if (!passowrdValid) {
			setInputs(currentInputs => {
				return {
					password: { value: '', isValid: passowrdValid }
				}
			})
			return
		}

		dispatch(updatePassword(currentUser.id, data))
		setFormSubmit(true)
		setShowEditModal(false)

		setInputs(initialInputsState)
		closeHandler()
	}

	return (
		<>
			<Modal show={showModal} onHide={closeHandler} centered size="md">
				<Modal.Header
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						backgroundColor: '#7993d2'
					}}>
					<Modal.Title style={{ fontSize: '1.5em' }}>
						Update Password
					</Modal.Title>
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
				<Modal.Body>
					<div className="row">
						<div className="col-12 col-md-12">
							<label style={{ fontWeight: 600, fontSize: '1.5em' }}>
								Password
							</label>
							<input
								type="text"
								className="form-control"
								value={inputs.password.value}
								onChange={e =>
									inputTextChangeHandler('password', e.target.value)
								}
							/>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={submitHandler}>
						Reset Password
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default ResetPasswordModel
