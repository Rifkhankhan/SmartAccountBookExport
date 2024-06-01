import * as expanseApis from '../Apis/ExpanseApis'
// import swal from 'sweetalert'
// import { authUiActions } from '../Redux/UI Slice/auth-ui-slice'
// import { authActions } from '../Redux/authSlice'
// import { uiActions } from '../Redux/UI Slice/ui-slice'
import { expanseActions } from '../store/ExpanseSlice'
// import { attendanceAction } from '../Redux/attendanceSlice'

export const createExpanse = formData => async dispatch => {
	try {
		// dispatch(uiActions.changeAsLoading())
		const { data } = await expanseApis.createExpanse(formData)
		// dispatch(uiActions.changeAsLoading())
		dispatch(expanseActions.createExpanse(data))
	} catch (error) {
		console.log(error)

		// if (error.response?.status === 400) {
		// 	// swal(
		// 	// 	'Please provide an email and password!',
		// 	// 	'Check the email and password!',
		// 	// 	'error'
		// 	// )
		// } else if (error.response?.status === 404) {
		// 	// swal(
		// 	// 	"You don't have HomeDelivery account!",
		// 	// 	'Please create an account! Or enter valid credentials!',
		// 	// 	'error'
		// 	// )
		// } else if (error.response?.status === 409) {
		// 	// swal('Wrong Password!', 'Please check your password!', 'error')
		// }
	}
}

export const getExpanses = () => async dispatch => {
	try {
		// dispatch(uiActions.changeAsLoading())
		const { data } = await expanseApis.getExpanses()
		dispatch(expanseActions.getExpanses(data))

		// dispatch(uiActions.changeAsLoading())
	} catch (error) {
		console.log(error)

		// if (error.response?.status === 400) {
		// 	// swal(
		// 	// 	'Please provide an email and password!',
		// 	// 	'Check the email and password!',
		// 	// 	'error'
		// 	// )
		// } else if (error.response?.status === 404) {
		// 	// swal(
		// 	// 	"You don't have HomeDelivery account!",
		// 	// 	'Please create an account! Or enter valid credentials!',
		// 	// 	'error'
		// 	// )
		// } else if (error.response?.status === 409) {
		// 	// swal('Wrong Password!', 'Please check your password!', 'error')
		// }
	}
}
export const getExpanse = id => async dispatch => {
	try {
		// dispatch(uiActions.changeAsLoading())
		const { data } = await expanseApis.getExpanse(id)
		dispatch(expanseActions.getExpanse(data))
		// dispatch(uiActions.changeAsLoading())
	} catch (error) {
		console.log(error)

		// if (error.response?.status === 400) {
		// 	// swal(
		// 	// 	'Please provide an email and password!',
		// 	// 	'Check the email and password!',
		// 	// 	'error'
		// 	// )
		// } else if (error.response?.status === 404) {
		// 	// swal(
		// 	// 	"You don't have HomeDelivery account!",
		// 	// 	'Please create an account! Or enter valid credentials!',
		// 	// 	'error'
		// 	// )
		// } else if (error.response?.status === 409) {
		// 	// swal('Wrong Password!', 'Please check your password!', 'error')
		// }
	}
}
export const updateExpanse = (id, formData) => async dispatch => {
	console.log(id, formData)
	try {
		dispatch(expanseActions.updateExpanse({ id, formData }))
		const { data } = await expanseApis.updateExpanse(id, formData)

		// dispatch(uiActions.changeAsLoading())
	} catch (error) {
		console.log(error)

		// if (error.response?.status === 400) {
		// 	// swal(
		// 	// 	'Please provide an email and password!',
		// 	// 	'Check the email and password!',
		// 	// 	'error'
		// 	// )
		// } else if (error.response?.status === 404) {
		// 	// swal(
		// 	// 	"You don't have HomeDelivery account!",
		// 	// 	'Please create an account! Or enter valid credentials!',
		// 	// 	'error'
		// 	// )
		// } else if (error.response?.status === 409) {
		// 	// swal('Wrong Password!', 'Please check your password!', 'error')
		// }
	}
}

export const deleteExpanse = id => async dispatch => {
	try {
		const { data } = await expanseApis.deleteExpanse(id)
		dispatch(expanseActions.deleteExpanse(id))
		// dispatch(uiActions.changeAsLoading())
	} catch (error) {
		console.log(error)

		// if (error.response?.status === 400) {
		// 	// swal(
		// 	// 	'Please provide an email and password!',
		// 	// 	'Check the email and password!',
		// 	// 	'error'
		// 	// )
		// } else if (error.response?.status === 404) {
		// 	// swal(
		// 	// 	"You don't have HomeDelivery account!",
		// 	// 	'Please create an account! Or enter valid credentials!',
		// 	// 	'error'
		// 	// )
		// } else if (error.response?.status === 409) {
		// 	// swal('Wrong Password!', 'Please check your password!', 'error')
		// }
	}
}
