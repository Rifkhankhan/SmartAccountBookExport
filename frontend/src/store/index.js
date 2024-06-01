import { expanseSlice } from './ExpanseSlice'
import { receiptSlice } from './ReceiptSlice'
import { userSlice } from './UserSlice'
import { authSlice } from './AuthSlice'
import { advanceSlice } from './AdvanceSlice'
import { loanSlice } from './LoanSlice'
import { accountRequestSlice } from './AccountRequestSlice'
import { thunk } from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'
import { requestSlice } from './DataActivitySlice'
import { CompanySlice } from './CompanySlice'
export const store = configureStore({
	reducer: {
		expanse: expanseSlice.reducer,
		receipt: receiptSlice.reducer,
		user: userSlice.reducer,
		advance: advanceSlice.reducer,
		loan: loanSlice.reducer,
		auth: authSlice.reducer,
		accountRequest: accountRequestSlice.reducer,
		request: requestSlice.reducer,
		company: CompanySlice.reducer
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk)
})
