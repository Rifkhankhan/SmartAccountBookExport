/* eslint-disable no-unused-expressions */
// import swal from 'sweetalert'
import swal from 'sweetalert'
import * as UserApi from './../Apis/UserRequest'
import { authActions } from '../store/AuthSlice'

import { userActions } from './../store/UserSlice'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const activateToggle = id => async dispatch => {
	dispatch(authActions.handleLoading())

	try {
		// dispatch(authUiActions.changeAsLoading())
		const { data } = await UserApi.activateToggle(id)
		if (data.success) {
			dispatch(userActions.activateToggle(id))
			toast.success('Completed Successfully!', {
				autoClose: 2000
			})
		} else {
			toast.error(`Oops! Something Wrong: `, {
				autoClose: 2000
			})
		}
	} catch (error) {
		console.log(error)

		if (error.response?.status === 400) {
			toast.error(`Oops! Something Wrong: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 404) {
			toast.error(`You don't have an Account: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 409) {
			toast.error(`Oops! You have no access: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 408) {
			toast.error(`Internal Server Error: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 500) {
			toast.error(`Internal Server Error: ${error.response.data.message}`, {
				autoClose: 2000
			})
		}
	}
	dispatch(authActions.handleLoading())
}

export const createUser = formData => async dispatch => {
	dispatch(authActions.handleLoading())
	try {
		// dispatch(uiActions.changeAsLoading())
		const { data } = await UserApi.createCustomer(formData)

		if (data.success) {
			dispatch(userActions.createUser(formData))
			toast.success('Created Successfully!', {
				autoClose: 2000
			})
		} else {
			swal('Oops! Something Wrong', 'Try again please!', 'error')
		}

		// dispatch(uiActions.changeAsLoading())
	} catch (error) {
		if (error.response?.status === 400) {
			toast.error(`Oops! Something Wrong: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 404) {
			toast.error(`You don't have an Account: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 409) {
			toast.error(`Oops! You have no access: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 408) {
			toast.error(`Internal Server Error: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 500) {
			toast.error(`Internal Server Error: ${error.response.data.message}`, {
				autoClose: 2000
			})
		}
	}
	dispatch(authActions.handleLoading())
}

export const getUsers = () => async (dispatch, getState) => {
	dispatch(authActions.handleLoading())

	try {
		// dispatch(uiActions.changeAsLoading())
		const { data } = await UserApi.getCustomers()
		if (data.success) {
			dispatch(userActions.getUsers(data.data))
		} else {
			swal('Oops! Something Wrong', 'Try again please!', 'error')
		}
		// dispatch(uiActions.changeAsLoading())
	} catch (error) {
		if (error.response?.status === 400) {
			toast.error(`Oops! Something Wrong: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 404) {
			toast.error(`You don't have an Account: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 409) {
			toast.error(`Oops! You have no access: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 408) {
			toast.error(`Internal Server Error: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 500) {
			toast.error(`Internal Server Error: ${error.response.data.message}`, {
				autoClose: 2000
			})
		}
	} finally {
		// Dispatch an action to handle loading state (assuming you have authActions.handleLoading())
		dispatch(authActions.handleLoading())
	}
}

export const getUserActivities = () => async (dispatch, getState) => {
	dispatch(authActions.handleLoading())

	try {
		// dispatch(uiActions.changeAsLoading())
		const { data } = await UserApi.getUserActivities()
		if (data.success) {
			dispatch(userActions.getUserActivities(data.product))
		} else {
			swal('Oops! Something Wrong', 'Try again please!', 'error')
		}
		// dispatch(uiActions.changeAsLoading())
	} catch (error) {
		if (error.response?.status === 400) {
			toast.error(`Oops! Something Wrong: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 404) {
			toast.error(`You don't have an Account: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 409) {
			toast.error(`Oops! You have no access: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 408) {
			toast.error(`Internal Server Error: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 500) {
			toast.error(`Internal Server Error: ${error.response.data.message}`, {
				autoClose: 2000
			})
		}
	} finally {
		// Dispatch an action to handle loading state (assuming you have authActions.handleLoading())
		dispatch(authActions.handleLoading())
	}
}
export const getUser = id => async dispatch => {
	dispatch(authActions.handleLoading())
	try {
		const { data } = await UserApi.getCustomer(id)
	} catch (error) {
		console.log(error)

		if (error.response?.status === 400) {
			toast.error(`Oops! Something Wrong: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 404) {
			toast.error(`You don't have an Account: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 409) {
			toast.error(`Oops! You have no access: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 408) {
			toast.error(`Internal Server Error: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 500) {
			toast.error(`Internal Server Error: ${error.response.data.message}`, {
				autoClose: 2000
			})
		}
	}
	dispatch(authActions.handleLoading())
}
export const updateUser = (id, formData) => async dispatch => {
	dispatch(authActions.handleLoading())

	try {
		const { data } = await UserApi.updateCustomer(id, formData)
		if (data.success) {
			dispatch(userActions.updateUser({ id, formData }))
			toast.success('Completed Successfully!', {
				autoClose: 2000
			})
		} else {
			swal('Oops! Something Wrong', 'Try again please!', 'error')
		}
	} catch (error) {
		console.log(error)

		if (error.response?.status === 400) {
			toast.error(`Oops! Something Wrong: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 404) {
			toast.error(`You don't have an Account: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 409) {
			toast.error(`Oops! You have no access: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 408) {
			toast.error(`Internal Server Error: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 500) {
			toast.error(`Internal Server Error: ${error.response.data.message}`, {
				autoClose: 2000
			})
		}
	}
	dispatch(authActions.handleLoading())
}

export const resetPassword = id => async dispatch => {
	dispatch(authActions.handleLoading())
	try {
		const { data } = await UserApi.resetPassword(id)
		if (data.success) {
			toast.success('Resetted Password Successfully!', {
				autoClose: 2000
			})
		} else {
			swal('Oops! Something Wrong', 'Try again please!', 'error')
		}
	} catch (error) {
		console.log(error)

		if (error.response?.status === 400) {
			toast.error(`Oops! Something Wrong: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 404) {
			toast.error(`You don't have an Account: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 409) {
			toast.error(`Oops! You have no access: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 408) {
			toast.error(`Internal Server Error: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 500) {
			toast.error(`Internal Server Error: ${error.response.data.message}`, {
				autoClose: 2000
			})
		}
	}
	dispatch(authActions.handleLoading())
}

export const updatePassword = (id, formData) => async dispatch => {
	dispatch(authActions.handleLoading())
	try {
		const { data } = await UserApi.updatePassword(id, formData)
		if (data.success) {
			toast.success('Updated Successfully!', {
				autoClose: 2000
			})
		} else {
			swal('Oops! Something Wrong', 'Try again please!', 'error')
		}
	} catch (error) {
		console.log(error)

		if (error.response?.status === 400) {
			toast.error(`Oops! Something Wrong: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 404) {
			toast.error(`You don't have an Account: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 409) {
			toast.error(`Oops! You have no access: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 408) {
			toast.error(`Internal Server Error: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 500) {
			toast.error(`Internal Server Error: ${error.response.data.message}`, {
				autoClose: 2000
			})
		}
	}
	dispatch(authActions.handleLoading())
}
