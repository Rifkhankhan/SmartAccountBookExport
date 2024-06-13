import { AccountRequestActions } from '../store/AccountRequestSlice'
import { authActions } from '../store/AuthSlice'
import { userActions } from '../store/UserSlice'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as AuthApi from '../Apis/AuthRequest'
import swal from 'sweetalert'

export const logIn = formData => async dispatch => {
	dispatch(authActions.handleLoading())
	try {
		const { data } = await AuthApi.logIn(formData)
		if (data.success) {
			dispatch(authActions.login(data))
			toast.success('LoggedIn Successfully!', {
				autoClose: 2000
			})
		}
	} catch (error) {
		toast.error(`${error.response?.status}: ${error.response.data.message}`, {
			autoClose: 2000
		})

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
			toast.error(
				`Internal Server Error ${error.response?.status}: ${error.response.data.message}`,
				{
					autoClose: 2000
				}
			)
		}
	}
	dispatch(authActions.handleLoading())
}

export const logout = () => async dispatch => {
	dispatch(authActions.handleLoading())
	try {
		await AuthApi.logout()
		dispatch(authActions.logout())
		toast.success('LoggedOut Successfully!', {
			autoClose: 2000
		})
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

export const logoutUserAccount = id => async dispatch => {
	dispatch(authActions.handleLoading())
	try {
		// const token = window.localStorage.getItem('token')

		const { data } = await AuthApi.logoutUserAccount(id)
		if (data.success) {
			dispatch(userActions.getUserActivities(data.product))
			toast.success("LoggedOut User's Successfully!", {
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

export const autoLogin = () => async dispatch => {
	dispatch(authActions.handleLoading())
	try {
		const { data } = await AuthApi.autoLogin()

		if (data.success) {
			dispatch(authActions.autoLogin(data))
		}
	} catch (error) {
		if (error.response?.status === 400) {
			toast.error(`Oops! Something Wrong: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 404) {
			toast.error(`You don't have an Account: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 401) {
			console.log(error.response.data.message)
		} else if (error.response?.status === 409) {
			toast.error(`Oops! You have no access: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 408) {
			toast.error(`Internal Server Error: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 500) {
			console.log(error.response.data.message)
		} else if (error.response?.status === 405) {
			toast.error(`Internal Server Error: ${error.response.data.message}`, {
				autoClose: 2000
			})
		}
	}

	dispatch(authActions.handleLoading())
}
