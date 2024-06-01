import { createSlice } from '@reduxjs/toolkit'
import swal from 'sweetalert'

export const accountRequestSlice = createSlice({
	name: 'accountRequest',
	initialState: {
		isLoading: false,
		activtit: [],
		requests: []
	},
	reducers: {
		handleLoading: (state, action) => {
			state.isLoading = !state.isLoading
		},
		createAccountRequest: (state, action) => {
			console.log(action.payload)
			state.accountRequests = [...action.payload]
		},
		getAccountRequests: (state, action) => {
			state.accountRequests = [...action.payload]
		},
		getRequests: (state, action) => {
			state.requests = [...action.payload]
		},
		getAccountRequest: (state, action) => {
			//   if (action.payload.success) state.notification = true;
		},
		deleteAccountRequest: (state, action) => {
			state.accountRequests = state.accountRequests.filter(
				accountRequest => accountRequest.arid !== action.payload.arid
			)
		},
		updateAccountRequest: (state, action) => {
			const updatedAdvance = {
				...action.payload
			}
			console.log(updatedAdvance)
			// Find the index of the object to update
			const index = state.accountRequests.findIndex(
				accountRequest => accountRequest.arid === action.payload.arid
			)

			if (index !== -1) {
				// Create a new array with the updated object
				const updatedAdvances = [
					...state.accountRequests.slice(0, index), // elements before the updated object
					updatedAdvance, // updated object
					...state.accountRequests.slice(index + 1) // elements after the updated object
				]

				// state.accountRequests = [...updatedAdvances]
			}
			swal('Successfully Updated!', 'Now You can Continue', 'success')
			state.accountRequests = [...action.payload]
		}
	}
})

export const AccountRequestActions = accountRequestSlice.actions
// export const classAction = classSlice.actions

export default accountRequestSlice.reducer
