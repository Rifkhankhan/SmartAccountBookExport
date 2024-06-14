import swal from 'sweetalert'
import * as CompanyApis from '../Apis/CompanyApis'
import { CompanyActions } from '../store/CompanySlice'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
export const createCompany = formData => async dispatch => {
	dispatch(CompanyActions.handleLoading())
	try {
		const { data } = await CompanyApis.createCompany(formData)

		if (data.success) {
			dispatch(CompanyActions.createCompany(data.requests))
			toast.success('Created Successfully!', {
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
	dispatch(CompanyActions.handleLoading())
}

export const getcompanies = () => async dispatch => {
	dispatch(CompanyActions.handleLoading())
	try {
		const { data } = await CompanyApis.getcompanies()

		if (data.success) {
			dispatch(CompanyActions.getcompanies(data.product))
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
	dispatch(CompanyActions.handleLoading())
}

export const getUserComponies = id => async dispatch => {
	dispatch(CompanyActions.handleLoading())
	try {
		const { data } = await CompanyApis.getUserComponies(id)

		if (data.success) {
			dispatch(CompanyActions.getUserCompanies(data.product))
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
	dispatch(CompanyActions.handleLoading())
}
