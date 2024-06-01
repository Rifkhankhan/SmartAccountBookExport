import React, { useState } from 'react'

const TransactionTable = ({ transactions }) => {
	// Initialize balance state
	const [balance, setBalance] = useState(0)

	// Function to calculate balance
	const calculateBalance = () => {
		let balance = 0
		return transactions.map(transaction => {
			// Update balance based on transaction type
			if (transaction.type === 'income') {
				balance += transaction.amount
			} else {
				balance -= transaction.amount
			}
			// Add balance property to transaction object
			return { ...transaction, balance }
		})
	}

	return (
		<table className="text-light">
			<thead>
				<tr>
					<th>Date</th>
					<th>Amount</th>
					<th>Type</th>
					<th>Balance</th>
				</tr>
			</thead>
			<tbody>
				{calculateBalance().map((transaction, index) => (
					<tr key={index}>
						<td>{transaction.date}</td>
						<td>{transaction.amount}</td>
						<td>{transaction.type}</td>
						<td>{transaction.balance}</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}

export default TransactionTable
