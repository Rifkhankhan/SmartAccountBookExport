import swal from 'sweetalert'
import * as ReceiptApis from '../Apis/ReceiptApis'
import { receiptActions } from '../store/ReceiptSlice'
// import swal from 'sweetalert'
// import { authUiActions } from '../Redux/UI Slice/auth-ui-slice'
// import { authActions } from '../Redux/authSlice'
// import { uiActions } from '../Redux/UI Slice/ui-slice'
// import { CustomerAction } from '../store/customerSlice'
// import { attendanceAction } from '../Redux/attendanceSlice'

export const createReceipt = formData => async dispatch => {
	try {
		// dispatch(uiActions.changeAsLoading())
		const { data } = await ReceiptApis.createReceipt(formData)
		// dispatch(uiActions.changeAsLoading())
		dispatch(receiptActions.createReceipt(data))
	} catch (error) {
		console.log(error)

		if (error.response?.status === 400) {
			swal(
				'Please provide an email and password!',
				'Check the email and password!',
				'error'
			)
		} else if (error.response?.status === 404) {
			swal(
				"You don't have HomeDelivery account!",
				'Please create an account! Or enter valid credentials!',
				'error'
			)
		} else if (error.response?.status === 409) {
			// swal('Wrong Password!', 'Please check your password!', 'error')
		}
	}
}

export const getReceipts = () => async dispatch => {
	try {
		// dispatch(uiActions.changeAsLoading())
		const { data } = await ReceiptApis.getReceipts()
		dispatch(receiptActions.getReceipts(data))
		// dispatch(uiActions.changeAsLoading())
	} catch (error) {
		console.log(error)

		if (error.response?.status === 400) {
			swal(
				'Please provide an email and password!',
				'Check the email and password!',
				'error'
			)
		} else if (error.response?.status === 404) {
			swal(
				"You don't have HomeDelivery account!",
				'Please create an account! Or enter valid credentials!',
				'error'
			)
		} else if (error.response?.status === 409) {
			swal('Wrong Password!', 'Please check your password!', 'error')
		}
	}
}
export const getReceipt = id => async dispatch => {
	try {
		// dispatch(uiActions.changeAsLoading())
		const { data } = await ReceiptApis.getReceipt(id)
		// dispatch(CustomerAction.getCustomer(data))
		// dispatch(uiActions.changeAsLoading())
	} catch (error) {
		console.log(error)

		if (error.response?.status === 400) {
			swal(
				'Please provide an email and password!',
				'Check the email and password!',
				'error'
			)
		} else if (error.response?.status === 404) {
			swal(
				"You don't have HomeDelivery account!",
				'Please create an account! Or enter valid credentials!',
				'error'
			)
		} else if (error.response?.status === 409) {
			swal('Wrong Password!', 'Please check your password!', 'error')
		}
	}
}
export const updateReceipt = (id, formData) => async dispatch => {
	try {
		const { data } = await ReceiptApis.updateReceipt(id, formData)
		dispatch(receiptActions.updateReceipt({ id, formData }))
		// dispatch(CustomerAction.updateCustomer(data))
		// dispatch(uiActions.changeAsLoading())
	} catch (error) {
		console.log(error)

		if (error.response?.status === 400) {
			swal(
				'Please provide an email and password!',
				'Check the email and password!',
				'error'
			)
		} else if (error.response?.status === 404) {
			swal(
				"You don't have HomeDelivery account!",
				'Please create an account! Or enter valid credentials!',
				'error'
			)
		} else if (error.response?.status === 409) {
			swal('Wrong Password!', 'Please check your password!', 'error')
		}
	}
}

export const deleteReceipt = id => async dispatch => {
	try {
		const { data } = await ReceiptApis.deleteReceipt(id)
		dispatch(receiptActions.deleteReceipt(id))

		// dispatch(CustomerAction.updateCustomer(data))
		// dispatch(uiActions.changeAsLoading())
	} catch (error) {
		console.log(error)

		if (error.response?.status === 400) {
			swal(
				'Please provide an email and password!',
				'Check the email and password!',
				'error'
			)
		} else if (error.response?.status === 404) {
			swal(
				"You don't have HomeDelivery account!",
				'Please create an account! Or enter valid credentials!',
				'error'
			)
		} else if (error.response?.status === 409) {
			swal('Wrong Password!', 'Please check your password!', 'error')
		}
	}
}
