import React, { useEffect, useState } from 'react'
import styles from './Login.module.css'
import man from './../../Images/man.png'
import logo from './../../Images/logo.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../../store/AuthSlice'
import { useNavigate } from 'react-router-dom'
import { logIn } from '../../Actions/AuthAction'
import LoadingSpinner from './../../Components/LoadingSpinner/LoadingSpinner'
import { getUsers } from '../../Actions/userAction'
const Login = props => {
	const [formSubmit, setFormSubmit] = useState(false)
	const dispatch = useDispatch()
	const [formValid, setFormValid] = useState(true)
	const navigate = useNavigate()
	const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
	const isLoading = useSelector(state => state.auth.isLoading)

	const initialInputsState = {
		name: { value: '', isValid: true },
		password: { value: '', isValid: true }
	}
	const [inputs, setInputs] = useState(initialInputsState)

	useEffect(() => {
		if (formSubmit) {
			if (isAuthenticated) {
				navigate('/')
			}
		}
	}, [isAuthenticated])

	useEffect(() => {
		setFormValid(inputs.name.isValid && inputs.password.isValid)

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
	const submitHandler = e => {
		e.preventDefault()
		const data = {
			name: inputs.name.value,
			password: inputs.password.value
		}

		const nameValid = data.name?.trim().length > 0
		const passwordValid = data.password?.trim().length >= 6

		if (!nameValid || !passwordValid) {
			setInputs(currentInputs => {
				return {
					...currentInputs,
					name: { value: currentInputs.name.value, isValid: nameValid },
					password: {
						value: currentInputs.password.value,
						isValid: passwordValid
					}
				}
			})
			return
		}

		dispatch(logIn(data))
		setFormSubmit(true)
		setInputs(initialInputsState)
	}

	return (
		<div className={`container ${styles.container}`}>
			<div className={styles.form}>
				<div className="row">
					<img src={logo} alt="" />
				</div>
				{!formValid && (
					<div className="row ">
						<p
							className="text-warning text-capitalize  "
							style={{ fontSize: '2vh' }}>
							Invalid Data Please check!
						</p>
					</div>
				)}
				<form className="row" onSubmit={submitHandler}>
					<div
						class="form-group col-md-10 col-10 my-2"
						style={{ marginInline: 'auto' }}>
						<input
							type="text"
							class="form-control"
							id="exampleInputEmail1"
							placeholder="User Name"
							value={inputs.name.value}
							onChange={e => inputTextChangeHandler('name', e.target.value)}
						/>
					</div>
					<div
						class="form-group col-md-10 col-10 my-1"
						style={{ marginInline: 'auto' }}>
						<input
							type="password"
							class="form-control"
							id="exampleInputEmail1"
							value={inputs.password.value}
							onChange={e => inputTextChangeHandler('password', e.target.value)}
							placeholder="Password"
						/>
					</div>
					<div
						class="form-group col-md-10 col-10 my-2 mb-3 "
						style={{ marginInline: 'auto' }}>
						<button
							type="submit"
							class="btn btn-primary"
							style={{ width: '100%' }}>
							Submit
						</button>
					</div>
				</form>
			</div>

			{isLoading && <LoadingSpinner />}
		</div>
	)
}

export default Login
