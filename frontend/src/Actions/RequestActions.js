import swal from 'sweetalert'
import * as RequestApis from '../Apis/RequestApis'
import { RequestActions } from '../store/DataActivitySlice'
import { AccountRequestActions } from '../store/AccountRequestSlice'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const getRequests = () => async dispatch => {
	// if (!checkCookie()) return

	dispatch(RequestActions.handleLoading())
	try {
		const { data } = await RequestApis.getRequests()

		if (data.success) {
			dispatch(RequestActions.getRequests(data.product))
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
	dispatch(RequestActions.handleLoading())
}

export const resetData = formData => async dispatch => {
	// if (!checkCookie()) return

	dispatch(RequestActions.handleLoading())
	try {
		const { data } = await RequestApis.resetData(formData)

		if (data.success) {
			console.log(data)
			dispatch(RequestActions.getRequests(data.requests))
			dispatch(AccountRequestActions.getAccountRequests(data.accountrequests))
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
	dispatch(RequestActions.handleLoading())
}
