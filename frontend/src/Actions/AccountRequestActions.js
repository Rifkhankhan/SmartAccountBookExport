import swal from 'sweetalert'
import * as AccountRequestApis from '../Apis/AccountRequestApis'
import { AccountRequestActions } from '../store/AccountRequestSlice'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Cookies from 'js-cookie'

const cookieName = 'SABExport'

const checkCookie = () => {
	const cookieValue = Cookies.get(cookieName)
	if (!cookieValue) {
		console.log('Cookie not found')
		return false
	}
	console.log(`Cookie found: ${cookieValue}`)
	return true
}

export const createAccountRequest = formData => async dispatch => {
	// if (!checkCookie()) return

	dispatch(AccountRequestActions.handleLoading())
	try {
		const { data } = await AccountRequestApis.createAccountRequest(formData)

		if (data.success) {
			dispatch(AccountRequestActions.createAccountRequest(data.requests))
			swal('Successfully Created!', 'Now You can Continue', 'success')
			toast.success('Completed Successfully!', {
				autoClose: 2000
			})
		}
	} catch (error) {
		if (error.response?.status === 400) {
			toast.error(`${error.response?.status}: ${error.response.data.message}`, {
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
			toast.error(`${error.response?.status}: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 500) {
			toast.error(`Internal Server Error: ${error.response.data.message}`, {
				autoClose: 2000
			})
		}
	}
	dispatch(AccountRequestActions.handleLoading())
}

export const getAccountRequests = () => async dispatch => {
	// if (!checkCookie()) return

	dispatch(AccountRequestActions.handleLoading())
	try {
		const { data } = await AccountRequestApis.getAccountRequests()

		if (data.success) {
			dispatch(AccountRequestActions.getAccountRequests(data.product))
		}
	} catch (error) {
		if (error.response?.status === 400) {
			toast.error(`${error.response?.status}: ${error.response.data.message}`, {
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
			toast.error(`${error.response?.status}: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 500) {
			toast.error(`Internal Server Error: ${error.response.data.message}`, {
				autoClose: 2000
			})
		}
	}
	dispatch(AccountRequestActions.handleLoading())
}

export const updateAccountRequest = (formData, datas) => async dispatch => {
	// if (!checkCookie()) return

	dispatch(AccountRequestActions.handleLoading())

	try {
		const { data } = await AccountRequestApis.updateAccountRequest(
			formData.arid,
			formData
		)
		if (data.success) {
			dispatch(AccountRequestActions.createAccountRequest(data.requests))
			toast.success('Updated Successfully!', {
				autoClose: 2000
			})
		}
	} catch (error) {
		if (error.response?.status === 400) {
			toast.error(`${error.response?.status}: ${error.response.data.message}`, {
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
			toast.error(`${error.response?.status}: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 500) {
			toast.error(`Internal Server Error: ${error.response.data.message}`, {
				autoClose: 2000
			})
		}
	}
	dispatch(AccountRequestActions.handleLoading())
}

export const deleteAccountRequest = formData => async dispatch => {
	// if (!checkCookie()) return

	dispatch(AccountRequestActions.handleLoading())
	try {
		const { data } = await AccountRequestApis.disableAccountRequest(formData)

		if (data.success) {
			dispatch(AccountRequestActions.deleteAccountRequest(data.product))
			toast.success('Deleted Successfully!', {
				autoClose: 2000
			})
		} else {
			swal('Oops! Something Wrong', 'Try again please!', 'error')
		}
	} catch (error) {
		if (error.response?.status === 400) {
			toast.error(`${error.response?.status}: ${error.response.data.message}`, {
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
			toast.error(`${error.response?.status}: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 500) {
			toast.error(`Internal Server Error: ${error.response.data.message}`, {
				autoClose: 2000
			})
		}
	}
	dispatch(AccountRequestActions.handleLoading())
}

export const importAccountRequest = formData => async dispatch => {
	// if (!checkCookie()) return

	dispatch(AccountRequestActions.handleLoading())
	try {
		const { data } = await AccountRequestApis.importAccountRequest(formData)
		console.log(data)
		if (data.success) {
			dispatch(AccountRequestActions.importData(data.requests))

			toast.success('imported Successfully!', {
				autoClose: 2000
			})
		}
	} catch (error) {
		if (error.response?.status === 400) {
			toast.error(`${error.response?.status}: ${error.response.data.message}`, {
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
			toast.error(`${error.response?.status}: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 500) {
			toast.error(`Internal Server Error: ${error.response.data.message}`, {
				autoClose: 2000
			})
		}
	}
	dispatch(AccountRequestActions.handleLoading())
}
