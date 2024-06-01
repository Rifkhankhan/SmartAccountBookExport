import swal from 'sweetalert'
import * as LoanApis from '../Apis/LoanApis'
import { loanActions } from '../store/LoanSlice'
// import swal from 'sweetalert'
// import { authUiActions } from '../Redux/UI Slice/auth-ui-slice'
// import { authActions } from '../Redux/authSlice'
// import { uiActions } from '../Redux/UI Slice/ui-slice'
// import { CustomerAction } from '../store/customerSlice'
// import { attendanceAction } from '../Redux/attendanceSlice'

export const createLoan = formData => async dispatch => {
	try {
		// dispatch(uiActions.changeAsLoading())
		const { data } = await LoanApis.createLoan(formData)
		// dispatch(uiActions.changeAsLoading())
		dispatch(loanActions.createLoan(data))
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

export const getLoans = () => async dispatch => {
	try {
		// dispatch(uiActions.changeAsLoading())
		const { data } = await LoanApis.getLoans()
		dispatch(loanActions.getLoans(data))
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
export const getLoan = id => async dispatch => {
	try {
		// dispatch(uiActions.changeAsLoading())
		const { data } = await LoanApis.getLoan(id)
		// dispatch(loanActions.getLoan(data))
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
export const updateLoan = (id, formData) => async dispatch => {
	try {
		const { data } = await LoanApis.updateLoan(id, formData)
		dispatch(loanActions.updateLoan({ id, formData }))
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

export const deleteLoan = id => async dispatch => {
	try {
		const { data } = await LoanApis.deleteLoan(id)
		dispatch(loanActions.deleteLoan(id))

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
