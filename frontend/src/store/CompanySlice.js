import { createSlice } from '@reduxjs/toolkit'
import swal from 'sweetalert'

export const CompanySlice = createSlice({
	name: 'company',
	initialState: {
		isLoading: false,
		companies: [],
		userCompanies: [],
		requests: []
	},
	reducers: {
		handleLoading: (state, action) => {
			state.isLoading = !state.isLoading
		},
		createCompany: (state, action) => {
			state.companies = [...action.payload]
		},
		getcompanies: (state, action) => {
			state.companies = [...action.payload]
		},
		getUserCompanies: (state, action) => {
			state.userCompanies = [...action.payload]
		}
	}
})

export const CompanyActions = CompanySlice.actions
// export const classAction = classSlice.actions

export default CompanySlice.reducer
