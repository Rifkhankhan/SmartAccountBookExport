import { createSlice } from '@reduxjs/toolkit'

export const advanceSlice = createSlice({
	name: 'advance',
	initialState: {
		advances: []
	},
	reducers: {
		createAdvance: (state, action) => {
			state.advances.push(action.payload)
		},
		getAdvances: (state, action) => {
			state.advances = [...action.payload]
		},
		getAdvance: (state, action) => {
			//   if (action.payload.success) state.notification = true;
		},
		deleteAdvance: (state, action) => {
			state.advances = state.advances.filter(
				advance => advance._id !== action.payload
			)
		},
		updateAdvance: (state, action) => {
			const updatedAdvance = {
				_id: action.payload.id,
				...action.payload.formData
			}

			// Find the index of the object to update
			const index = state.advances.findIndex(
				receipt => receipt._id === action.payload.id
			)

			if (index !== -1) {
				// Create a new array with the updated object
				const updatedAdvances = [
					...state.advances.slice(0, index), // elements before the updated object
					updatedAdvance, // updated object
					...state.advances.slice(index + 1) // elements after the updated object
				]
				state.advances = updatedAdvances
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

export const advanceActions = advanceSlice.actions
// export const classAction = classSlice.actions

export default advanceSlice.reducer
