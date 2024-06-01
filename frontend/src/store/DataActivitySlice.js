import { createSlice } from '@reduxjs/toolkit'
import swal from 'sweetalert'

export const requestSlice = createSlice({
	name: 'request',
	initialState: {
		isLoading: false,
		requests: []
	},
	reducers: {
		handleLoading: (state, action) => {
			state.isLoading = !state.isLoading
		},

		getRequests: (state, action) => {
			state.requests = [...action.payload]
		},

		updateRequest: (state, action) => {
			state.accountRequests = [...action.payload]
			swal('Successfully Updated!', 'Now You can Continue', 'success')
		}
	}
})

export const RequestActions = requestSlice.actions
// export const classAction = classSlice.actions

export default requestSlice.reducer
