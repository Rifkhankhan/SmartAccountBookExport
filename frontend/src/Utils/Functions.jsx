import jsPDF from 'jspdf'
import image from './../Images/SCIT_LOGO.png'

export const getBalance = (list, setBalance) => {
	const today = new Date()
	const yesterday = new Date(today)
	yesterday.setDate(today.getDate() - 1)

	const totalAmountBeforeYesterday = list.reduce((total, current) => {
		if (current.requestForm === 'got' || current.requestType === 'receipt') {
			return total + parseFloat(current.amount)
		} else {
			return total - parseFloat(current.amount)
		}
	}, 0)

	setBalance(totalAmountBeforeYesterday)
}

export const getTotalExpenseAmount = (expanses, setTotalExpanses) => {
	// calculate total expenses

	const totalExpanses = expanses.reduce((total, current) => {
		if (current.requestForm === 'expense') {
			return total + +current.amount
		}
		return total // Make sure to return total even if the condition isn't met
	}, 0)
	setTotalExpanses(totalExpanses)
}

export const getTotalIncomeAmount = (
	incomes,
	setTotalIncomes,
	setCapitalAmount
) => {
	// calculate total expenses

	const totalIncomes = incomes.reduce((total, current) => {
		if (current.requestForm === 'cash') {
			return total + +current.amount
		}
		return total // Make sure to return total even if the condition isn't met
	}, 0)

	const totalCapital = incomes.reduce((total, current) => {
		if (current.requestForm === 'capital') {
			return total + +current.amount
		}
		return total // Make sure to return total even if the condition isn't met
	}, 0)

	setTotalIncomes(totalIncomes)
	setCapitalAmount(totalCapital)
}

export const getOpeningBalance = (list, setOpeningBalance) => {
	const today = new Date()
	const yesterday = new Date(today)
	yesterday.setDate(today.getDate() - 1)
	const formattedYesterday = yesterday.toISOString().split('T')[0]

	// Filter list to get entries before yesterday
	const beforeYesterdayList = list.filter(li => {
		const currentDate = new Date(li.date).toISOString().split('T')[0]
		return currentDate <= formattedYesterday
	})

	const totalAmountBeforeYesterday = beforeYesterdayList.reduce(
		(total, current) => {
			if (current.requestForm === 'got' || current.requestType === 'receipt') {
				return total + parseFloat(current.amount)
			} else {
				return total - parseFloat(current.amount)
			}
		},
		0
	)

	setOpeningBalance(totalAmountBeforeYesterday)
}

export const getTotalAdvanceAmount = (
	advances,
	setPaidAdvance,
	setGotAdvance
) => {
	// calculate total expenses

	const totalPaidAdvance = advances.reduce((total, current) => {
		if (current.requestForm === 'paid' && current.requestType === 'advance') {
			return total + +current.amount
		}
		return total // Make sure to return total even if the condition isn't met
	}, 0)

	const totalGotAdvance = advances.reduce((total, current) => {
		if (current.requestForm === 'got' && current.requestType === 'advance') {
			return total + +current.amount
		}
		return total // Make sure to return total even if the condition isn't met
	}, 0)

	setPaidAdvance(totalPaidAdvance)
	setGotAdvance(totalGotAdvance)
}

export const getTotalLoanAmount = (advances, setPaidLoan, setGotLoan) => {
	// calculate total expenses

	const totalPaidLoan = advances.reduce((total, current) => {
		if (current.requestForm === 'paid' && current.requestType === 'loan') {
			return total + +current.amount
		}
		return total // Make sure to return total even if the condition isn't met
	}, 0)

	const totalGotLoan = advances.reduce((total, current) => {
		if (current.requestForm === 'got' && current.requestType === 'loan') {
			return total + +current.amount
		}
		return total // Make sure to return total even if the condition isn't met
	}, 0)

	setPaidLoan(totalPaidLoan)
	setGotLoan(totalGotLoan)
}

export const converTime = () => {
	const currentDate = new Date() // Get the current date and time

	const year = currentDate.getFullYear() // Get the year (YYYY)
	const month = String(currentDate.getMonth() + 1).padStart(2, '0') // Get the month (MM), adding 1 because month is zero-indexed
	const day = String(currentDate.getDate()).padStart(2, '0') // Get the day (DD)

	const hours = String(currentDate.getHours()).padStart(2, '0') // Get the hours (HH)
	const minutes = String(currentDate.getMinutes()).padStart(2, '0') // Get the minutes (MM)
	const seconds = String(currentDate.getSeconds()).padStart(2, '0') // Get the seconds (SS)

	const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}` // Combine date and time with the T separator

	return formattedDateTime
}

// export pdf
export const exportPdf = async (
	title,
	companies,
	selectedCompany,
	converTime
) => {
	const currentDate = new Date()
	const formattedDate = currentDate.toISOString().slice(0, 10)

	const doc = new jsPDF({ orientation: 'landscape' })
	const logo = new Image()
	logo.src = image
	doc.addImage(logo, 'PNG', 15, 10, 30, 30)
	doc.setFontSize(16)
	doc.text('Date: ' + formattedDate, 200, 15)
	doc.text('Smart Account Book', 50, 15)
	doc.text(title, 50, 25)

	if (selectedCompany) {
		doc.text(
			`${companies.find(comp => +comp.cid === +selectedCompany)?.name}`,
			50,
			35
		)
	} else {
		doc.text('All', 50, 35)
	}

	doc.autoTable({ html: '#table', startY: 50 })
	const currentTimeWithDate = converTime()
	const filename = `Summary Report(${currentTimeWithDate}).pdf`
	doc.save(filename)
}

export const handlePrint = (title, companies, selectedCompany) => {
	const currentDate = new Date()
	const formattedDate = currentDate.toISOString().slice(0, 10)

	const doc = new jsPDF({ orientation: 'landscape' })
	const logo = new Image()
	logo.src = image
	doc.addImage(logo, 'PNG', 15, 10, 30, 30)
	doc.setFontSize(16)
	doc.text('Date: ' + formattedDate, 200, 15)
	doc.text('Smart Account Book', 50, 15)
	doc.text(title, 50, 25)

	if (selectedCompany) {
		doc.text(
			`${companies.find(comp => +comp.cid === +selectedCompany)?.name}`,
			50,
			35
		)
	} else {
		doc.text('All', 50, 35)
	}
	doc.autoTable({ html: '#table', startY: 50 })

	// Print the PDF content directly
	doc.autoPrint()

	// Convert the PDF document to a data URL
	const pdfContentBase64 = doc.output('datauristring')

	// Open a new window and print the PDF content
	const printWindow = window.open('', '_blank')
	printWindow.document.write('<html><head><title>Print</title></head><body>')
	printWindow.document.write(
		'<embed width="100%" height="100%" src="' +
			pdfContentBase64 +
			'" type="application/pdf" />'
	)
	printWindow.document.write(
		'<script>window.onload = function() { window.print(); }</script>'
	) // Print when fully loaded
	printWindow.document.write('</body></html>')
}
