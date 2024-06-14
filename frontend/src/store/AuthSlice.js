import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		isAuthenticated: false,

		user: [],
		isLoading: false
	},
	reducers: {
		login: (state, action) => {
			if (action.payload.success) {
				state.isAuthenticated = true
				state.user = action.payload.user
			}
		},
		handleLoading: (state, action) => {
			state.isLoading = !state.isLoading
		},
		logout: (state, action) => {
			state.isAuthenticated = false

			localStorage.removeItem('timeLeft')
			state.user = []
		},
		autoLogin: (state, action) => {
			if (action.payload?.success) {
				state.isAuthenticated = true
				state.user = action.payload.user
			} else {
				state.isAuthenticated = false

				state.user = []
			}
		}
	}
})

export const authActions = authSlice.actions
// export const classAction = classSlice.actions

export default authSlice.reducer
