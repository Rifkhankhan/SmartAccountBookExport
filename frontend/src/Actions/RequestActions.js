import swal from 'sweetalert'
import * as RequestApis from '../Apis/RequestApis'
import { RequestActions } from '../store/DataActivitySlice'
import { AccountRequestActions } from '../store/AccountRequestSlice'

export const getRequests = () => async dispatch => {
	dispatch(RequestActions.handleLoading())
	try {
		const { data } = await RequestApis.getRequests()

		if (data.success) {
			dispatch(RequestActions.getRequests(data.product))
		}
	} catch (error) {
		if (error.response?.status === 400) {
			swal('Oops! Something Wrong', error.response.data.message, 'error')
		} else if (error.response?.status === 404) {
			swal("You don't have Account", error.response.data.message, 'error')
		} else if (error.response?.status === 409) {
			swal('Oops! Something Wrong', error.response.data.message, 'error')
		} else if (error.response?.status === 408) {
			swal('Oops! You have no access', error.response.data.message, 'error')
		} else if (error.response?.status === 500) {
			swal('Internal Server Error', error.response.data.message, 'error')
		}
	}
	dispatch(RequestActions.handleLoading())
}

export const resetData = formData => async dispatch => {
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
			swal('Oops! Something Wrong', error.response.data.message, 'error')
		} else if (error.response?.status === 404) {
			swal("You don't have Account", error.response.data.message, 'error')
		} else if (error.response?.status === 409) {
			swal('Oops! Something Wrong', error.response.data.message, 'error')
		} else if (error.response?.status === 408) {
			swal('Oops! You have no access', error.response.data.message, 'error')
		} else if (error.response?.status === 500) {
			swal('Internal Server Error', error.response.data.message, 'error')
		}
	}
	dispatch(RequestActions.handleLoading())
}
