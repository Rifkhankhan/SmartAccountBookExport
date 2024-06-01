import { createSlice } from '@reduxjs/toolkit';

export const expanseSlice = createSlice({
  name: 'expanse',
  initialState: {
    expanses: []
  },
  reducers: {
    createExpanse: (state, action) => {
      state.expanses.push(action.payload);
    },
    getExpanses: (state, action) => {
      state.expanses = [...action.payload];
    },
    getExpanse: (state, action) => {
			//   if (action.payload.success) state.notification = true;
    },
    deleteExpanse: (state, action) => {
      state.expanses = state.expanses.filter(
				expanse => expanse._id !== action.payload
			);
    },
    updateExpanse: (state, action) => {
      const updatedExpanse = {
        _id: action.payload.id,
        ...action.payload.formData
      };

			// Find the index of the object to update
      const index = state.expanses.findIndex(
				expense => expense._id === action.payload.id
			);

      if (index !== -1) {
				// Create a new array with the updated object
        const updatedExpanses = [
          ...state.expanses.slice(0, index), // elements before the updated object
          updatedExpanse, // updated object
          ...state.expanses.slice(index + 1) // elements after the updated object
        ];
        state.expanses = updatedExpanses;
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
});

export const expanseActions = expanseSlice.actions;
// export const classAction = classSlice.actions

export default expanseSlice.reducer;
