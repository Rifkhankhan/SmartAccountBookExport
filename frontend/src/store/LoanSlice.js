import { createSlice } from '@reduxjs/toolkit'

export const loanSlice = createSlice({
	name: 'loan',
	initialState: {
		loans: []
	},
	reducers: {
		createLoan: (state, action) => {
			state.loans.push(action.payload)
		},
		getLoans: (state, action) => {
			state.loans = [...action.payload]
		},
		getLoan: (state, action) => {
			//   if (action.payload.success) state.notification = true;
		},
		deleteLoan: (state, action) => {
			state.loans = state.loans.filter(loan => loan._id !== action.payload)
		},
		updateLoan: (state, action) => {
			const updatedLoan = {
				_id: action.payload.id,
				...action.payload.formData
			}

			// Find the index of the object to update
			const index = state.loans.findIndex(
				receipt => receipt._id === action.payload.id
			)

			if (index !== -1) {
				// Create a new array with the updated object
				const updatedLoans = [
					...state.loans.slice(0, index), // elements before the updated object
					updatedLoan, // updated object
					...state.loans.slice(index + 1) // elements after the updated object
				]
				state.loans = updatedLoans
			}
			// another way to update............
			// Find the index of the object to update
			// const index = state.expanses.findIndex(expense => expense.id === updatedExpanse.id);

			// if (index !== -1) {
			//   // Update the object at the found index
			//   state.expanses[index] = updatedExpanse;
			// } else {
			//   console.error(`Expense with id ${updatedExpanse.id} not found`);
			// }
			// another way to update end.........
		}
	}
})

export const loanActions = loanSlice.actions
// export const classAction = classSlice.actions

export default loanSlice.reducer
