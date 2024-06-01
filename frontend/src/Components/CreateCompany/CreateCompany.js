import React, { useEffect, useState } from 'react'
import styles from './CreateCompany.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { expanseActions } from '../../store/ExpanseSlice'
import { createCompany } from '../../Actions/CompanyActions'
const CreateCompany = ({ header }) => {
	const [formValid, setFormValid] = useState(true)
	// const notification = useSelector(state => state.customer.notification)
	const [formSubmit, setFormSubmit] = useState(false)
	const dispatch = useDispatch()

	// Initial state for inputs
	const initialInputsState = {
		name: { value: '', isValid: true },
		location: { value: '', isValid: true }
	}

	// State for inputs
	const [inputs, setInputs] = useState(initialInputsState)

	useEffect(() => {
		setFormValid(inputs.name.isValid && inputs.location.isValid)

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
	// if (notification) {
	// 	setTimeout(function () {
	// 		window.location.reload()
	// 	}, 1000)
	// }
	const submitHandler = () => {
		const data = {
			name: inputs.name.value,
			location: inputs.location.value
		}

		const nameValid = data.name?.trim().length > 0
		const locationValid = data.location?.trim().length > 0

		// const phoneValid =
		// 	data.phone?.trim().length > 9 && data.phone?.trim().length <= 10

		if (!nameValid || !locationValid) {
			setInputs(currentInputs => {
				return {
					...currentInputs,
					name: { value: currentInputs.name.value, isValid: nameValid },
					location: {
						value: currentInputs.location.value,
						isValid: locationValid
					}
				}
			})
			return
		}

		dispatch(createCompany(data))
		setFormSubmit(true)
		setInputs(initialInputsState)
	}
	return (
		<div className={`container ${styles.container} `}>
			<h2 class="row col-md-12 col-sm-6" className={styles.header}>
				{header}
			</h2>
			{!formValid && (
				<div className="row ">
					<p
						className="text-warning text-capitalize  "
						style={{ fontSize: '2vh' }}>
						Invalid Data Please check!
					</p>
				</div>
			)}

			{/* {notification && (
				<div className={styles.successContainer}>
					<p className={styles.successMessage}>Successfully sent!</p>
				</div>
			)} */}

			{/* {!notification && !formSubmit && (
				<div className={styles.successContainer}>
					<i class="fas fa-spinner fa-spin"></i>
				</div>
			)} */}

			<form class="form">
				{/* forms row start */}
				<div class="form-row row">
					<div class="form-group col-12 col-md-6 mb-2">
						<input
							type="text"
							class="form-control"
							placeholder="Name"
							id="name"
							value={inputs.name.value}
							onChange={e => inputTextChangeHandler('name', e.target.value)}
						/>
					</div>
					<div class="form-group col-12 col-md-6 mb-2">
						<input
							type="text"
							class="form-control"
							placeholder="Location"
							id="location"
							value={inputs.location.value}
							onChange={e => inputTextChangeHandler('location', e.target.value)}
						/>
					</div>
				</div>
				<div class="form-row row">
					<div class="col-md-2 col-sm-6 my-1">
						<div class="form-group">
							<button
								type="button"
								className="btn btn-primary "
								onClick={submitHandler}>
								Submit
							</button>
						</div>
					</div>
				</div>
				)
			</form>
		</div>
	)
}

export default CreateCompany
