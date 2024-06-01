import { createSlice } from '@reduxjs/toolkit'

export const receiptSlice = createSlice({
	name: 'receipt',
	initialState: {
		receipts: []
	},
	reducers: {
		createReceipt: (state, action) => {
			console.log(action.payload)
			state.receipts.push(action.payload)
		},
		getReceipts: (state, action) => {
			state.receipts = [...action.payload]
		},
		getReceipt: (state, action) => {
			//   if (action.payload.success) state.notification = true;
		},
		deleteReceipt: (state, action) => {
			state.receipts = state.receipts.filter(
				expanse => expanse._id !== action.payload
			)
		},
		updateReceipt: (state, action) => {
			const updatedReceipt = {
				_id: action.payload.id,
				...action.payload.formData
			}

			// Find the index of the object to update
			const index = state.receipts.findIndex(
				receipt => receipt._id === action.payload.id
			)

			if (index !== -1) {
				// Create a new array with the updated object
				const updatedReceipts = [
					...state.receipts.slice(0, index), // elements before the updated object
					updatedReceipt, // updated object
					...state.receipts.slice(index + 1) // elements after the updated object
				]
				state.receipts = updatedReceipts
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

export const receiptActions = receiptSlice.actions
// export const classAction = classSlice.actions

export default receiptSlice.reducer
