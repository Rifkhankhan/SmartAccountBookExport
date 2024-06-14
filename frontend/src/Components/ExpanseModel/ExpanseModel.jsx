import React, { useEffect, useRef, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import styles from './ExpanseModel.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import image from './../../Images/SCIT_LOGO.png'

import {
	faClose,
	faDownload,
	faPen,
	faPrint
} from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { updateAccountRequest } from '../../Actions/AccountRequestActions'
import jsPDF from 'jspdf'
const ExpanseModel = ({
	clickedRow,
	showModal,
	closeHandler,
	deleteHandler,
	currentUser,
	companies,
	userCompanies,
	selectedCompany
}) => {
	const [showEditModal, setShowEditModal] = useState(false)

	const [formSubmit, setFormSubmit] = useState(false)
	const [previewUrl, setPreviewUrl] = useState()
	const [file, setFile] = useState()

	const [formValid, setFormValid] = useState(true)
	const dispatch = useDispatch()

	const filePickerRef = useRef()

	useEffect(() => {
		if (!file) {
			return
		}

		const fileReader = new FileReader()
		fileReader.onload = () => {
			setPreviewUrl(fileReader.result)
		}
		fileReader.readAsDataURL(file)
	}, [file])

	const pickHandler = e => {
		let pickedFile

		if (e.target.files && e.target.files.length === 1) {
			pickedFile = e.target.files[0]

			setFile(pickedFile)
		}
	}

	const pickImageHandler = () => {
		filePickerRef.current.click()
	}
	// initialInputsState
	const { balance, ...rest } = clickedRow

	const initialInputsState = {
		...rest,
		date: {
			value: new Date(clickedRow?.date).toISOString().split('T')[0],
			isValid: true
		},
		amount: { value: +clickedRow?.amount, isValid: true },
		cid: { value: +clickedRow?.cid, isValid: true },
		narration: { value: clickedRow?.narration, isValid: true },

		id: { value: currentUser?.id, isValid: true },

		requestForm: { value: clickedRow?.requestForm, isValid: true },
		methode: { value: clickedRow?.methode, isValid: true },
		requestType: { value: clickedRow?.requestType, isValid: true }
	}

	console.log(initialInputsState)

	const [inputs, setInputs] = useState(initialInputsState)
	useEffect(() => {
		setFormValid(
			inputs.amount?.isValid &&
				inputs.narration?.isValid &&
				inputs.cid?.isValid &&
				inputs.methode?.isValid
		)

		return () => {}
	}, [inputs])

	const inputTextChangeHandler = (inputType, enteredValue) => {
		setInputs(currentInputValue => {
			console.log(currentInputValue)
			return {
				...currentInputValue,
				[inputType]: { value: enteredValue, isValid: true }
			}
		})
	}

	const submitHandler = e => {
		e.preventDefault()
		const data = {
			...rest,
			narration: inputs.narration?.value,
			amount: +inputs.amount?.value,
			date: inputs.date?.value,
			cid: inputs.cid?.value,
			id: inputs.id?.value,
			requestForm: inputs.requestForm?.value,
			methode: inputs.methode?.value,

			requestType: inputs.requestType?.value
		}

		const narrationValid = data.narration?.trim().length > 0
		const methodeValid = data.methode?.trim().length > 0
		const companyValid = +data.cid !== null

		const amountValid = +data.amount > 0

		if (!narrationValid || !amountValid || !methodeValid || !companyValid) {
			setInputs(currentInputs => {
				return {
					...data,
					narration: {
						value: currentInputs.narration.value,
						isValid: narrationValid
					},
					cid: {
						value: currentInputs.cid.value,
						isValid: companyValid
					},
					methode: {
						value: currentInputs.methode.value,
						isValid: methodeValid
					},
					amount: {
						value: +currentInputs.amount.value,
						isValid: amountValid
					}
				}
			})
			return
		}

		const formData = new FormData()
		formData.append('file', file)

		// Loop through the data object and append each property to the FormData
		for (const key in data) {
			if (data.hasOwnProperty(key)) {
				formData.append(key, data[key])
			}
		}

		const newData = {
			...data,
			filename: formData.get('file').name
		}

		dispatch(updateAccountRequest(formData, newData))
		closeHandler()
		setFormSubmit(true)
		setInputs(initialInputsState)
	}

	const converTime = () => {
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
	const exportPdf = async () => {
		// Get current date
		const currentDate = new Date()

		// Format the date as needed (e.g., YYYY-MM-DD)
		const formattedDate = currentDate.toISOString().slice(0, 10) // This will give you the date in YYYY-MM-DD format

		const doc = new jsPDF({ orientation: 'landscape' })
		const logo = new Image()
		logo.src = image // Provide the path to your logo image
		doc.addImage(logo, 'PNG', 15, 10, 30, 30) // Adjust coordinates and dimensions as needed
		// Add other custom elements
		doc.setFontSize(16)
		doc.text('Date: ' + formattedDate, 200, 15)
		doc.text('Smart Account Book', 50, 15)
		doc.text('Expense Report', 50, 25)
		// Add the date to the PDF document
		// Define column headers
		var columns = [
			{ header: 'Date', dataKey: 'col1' },
			{ header: 'Company', dataKey: 'col2' },
			{ header: 'Amount', dataKey: 'col3' },
			{ header: 'Category', dataKey: 'col4' },
			{ header: 'Payment Type', dataKey: 'col5' },
			{ header: 'Narration', dataKey: 'col6' }
			// Add more columns as needed
		]

		// Define your data
		var data = [
			{
				col1: inputs.date.value,
				col2: companies.find(comp => comp.cid === inputs.cid.value)?.name
					? companies.find(comp => comp.cid === inputs.cid.value)?.name
					: 'None',
				col3: inputs.amount.value,
				col4: inputs.requestType.value,
				col5:
					inputs.methode.value === 'transfer'
						? 'Bank Transfer'
						: inputs.methode.value === 'deposite'
						? 'Bank Deposite'
						: inputs.methode.value,
				col6: inputs.narration.value
			}

			// Add more rows as needed
		]

		// Configure options
		var options = {
			startY: 50, // Adjust startY as needed
			margin: { top: 50 }, // Adjust margins if needed
			bodyStyles: { minCellHeight: 15 } // Adjust minimum cell height if needed
		}

		// Add columns and data to the table
		doc.autoTable(columns, data, options)

		const currentTimeWithDate = converTime()
		const filename = `Expense(${currentTimeWithDate}).pdf`
		doc.save(filename)
	}
	// calculate the balance
	const handlePrint = () => {
		const currentDate = new Date()
		const formattedDate = currentDate.toISOString().slice(0, 10)

		const doc = new jsPDF({ orientation: 'landscape' })
		const logo = new Image()
		logo.src = image
		doc.addImage(logo, 'PNG', 15, 10, 30, 30)
		doc.setFontSize(16)
		doc.text('Date: ' + formattedDate, 200, 15)
		doc.text('Smart Account Book', 50, 15)

		doc.text('Expense Report', 50, 25)

		// Define column headers
		var columns = [
			{ header: 'Date', dataKey: 'col1' },
			{ header: 'Company', dataKey: 'col2' },
			{ header: 'Amount', dataKey: 'col3' },
			{ header: 'Category', dataKey: 'col34' },
			{ header: 'Payment Type', dataKey: 'col5' },
			{ header: 'Narration', dataKey: 'col6' }
			// Add more columns as needed
		]

		// Define your data
		var data = [
			{
				col1: inputs.date.value,
				col2: companies.find(comp => comp.cid === inputs.cid.value)?.name
					? companies.find(comp => comp.cid === inputs.cid.value)?.name
					: 'None',
				col3: inputs.amount.value,
				col4: inputs.requestType.value,
				col5:
					inputs.methode.value === 'transfer'
						? 'Bank Transfer'
						: inputs.methode.value === 'deposite'
						? 'Bank Deposite'
						: inputs.methode.value,
				col6: inputs.narration.value
			}

			// Add more rows as needed
		]

		// Configure options
		var options = {
			startY: 50, // Adjust startY as needed
			margin: { top: 50 }, // Adjust margins if needed
			bodyStyles: { minCellHeight: 15 } // Adjust minimum cell height if needed
		}

		// Add columns and data to the table
		doc.autoTable(columns, data, options)

		// Print the PDF content directly
		doc.autoPrint()

		// Convert the PDF document to a data URL
		const pdfContentBase64 = doc.output('datauristring')

		// Open a new window and print the PDF content
		const printWindow = window.open('', '_blank')
		printWindow.document.write('<html><body>')
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
	return (
		<>
			<input
				type="file"
				name=""
				value=""
				style={{ display: 'none' }}
				accept=".jpg,.png,.jpeg"
				onChange={pickHandler}
				ref={filePickerRef}
			/>

			{!showEditModal && (
				<Modal show={showModal} onHide={closeHandler} centered size="lg">
					<Modal.Header
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							backgroundColor: '#7993d2'
						}}>
						<Modal.Title style={{ fontSize: '2em' }}>View Details</Modal.Title>
						<div>
							<FontAwesomeIcon
								className={styles.editBtn}
								icon={faDownload}
								onClick={exportPdf}
							/>

							<FontAwesomeIcon
								className={styles.editBtn}
								icon={faPrint}
								onClick={handlePrint}
							/>

							{currentUser.expansePermission === 'yes' &&
								currentUser.expanseEditPermission === 'yes' && (
									<FontAwesomeIcon
										className={styles.editBtn}
										icon={faPen}
										onClick={() => setShowEditModal(current => !current)}
									/>
								)}
						</div>
					</Modal.Header>
					<Modal.Body
						style={{
							marginTop: '0px',
							marginBlock: '0px',
							paddingBlock: '0px'
						}}>
						<div className="row">
							<div className="col-12 col-md-2">
								<label style={{ fontWeight: 600, fontSize: '1.2em' }}>
									Date
								</label>
								<p>{inputs.date.value}</p>
							</div>
							<div className="col-12 col-md-2">
								<label style={{ fontWeight: 600, fontSize: '1.2em' }}>
									Company
								</label>
								<p>
									{' '}
									{companies.find(comp => comp.cid === inputs.cid.value)?.name
										? companies.find(comp => comp.cid === inputs.cid.value)
												?.name
										: 'None'}
								</p>
							</div>
							<div className="col-12 col-md-2">
								<label style={{ fontWeight: 600, fontSize: '1.2em' }}>
									Amount
								</label>
								<p>{inputs.amount.value}</p>
							</div>
							<div className="col-12 col-md-2">
								<label style={{ fontWeight: 600, fontSize: '1.2em' }}>
									Category
								</label>
								<p>{inputs.requestType.value}</p>
							</div>
							<div className="col-12 col-md-3">
								<label style={{ fontWeight: 600, fontSize: '1.2em' }}>
									Payment Type
								</label>
								<p>
									{inputs.methode.value === 'transfer'
										? 'Bank Transfer'
										: inputs.methode.value === 'deposite'
										? 'Bank Deposite'
										: inputs.methode.value}
								</p>
							</div>
						</div>
						<div className="row">
							<div className="col-12 col-md-12">
								<label style={{ fontWeight: 600, fontSize: '1.2em' }}>
									Narration
								</label>
								<textarea
									rows={5}
									disabled
									style={{
										marginInline: 'auto',
										width: '98%',
										border: '2px solid blue',
										borderRadius: '5px'
									}}>
									{inputs.narration.value}
								</textarea>
							</div>
						</div>

						{clickedRow?.filename !== null &&
							clickedRow?.filename !== 'null' && (
								<div className="row">
									<label style={{ fontWeight: 600, fontSize: '1.2em' }}>
										Image
									</label>
									<img
										src={`http://localhost:5000/uploads/${clickedRow?.filename}`}
										alt="Uploaded"
										style={{ width: '100%', height: '50vh' }}
									/>
								</div>
							)}
					</Modal.Body>
					<Modal.Footer>
						{currentUser.expansePermission === 'yes' &&
							currentUser.expanseDeletePermission === 'yes' && (
								<Button
									variant="danger"
									onClick={() => deleteHandler(clickedRow)}>
									Delete
								</Button>
							)}
						<Button variant="secondary" onClick={closeHandler}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
			)}

			{showEditModal && (
				<Modal show={showModal} onHide={closeHandler} centered size="lg">
					<Modal.Header
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							backgroundColor: '#7993d2'
						}}>
						<Modal.Title style={{ fontSize: '2em' }}>Edit Details</Modal.Title>
						<FontAwesomeIcon
							className={styles.editBtn}
							icon={faClose}
							onClick={() => setShowEditModal(current => !current)}
						/>
					</Modal.Header>
					{!formValid && (
						<div
							className="row "
							style={{ paddingBlock: '0px', marginBlock: '0px' }}>
							<p
								className="text-danger text-capitalize  "
								style={{
									fontSize: '3vh',
									textAlign: 'center',
									paddingBlock: '0px',
									marginBlock: '0px'
								}}>
								Invalid Data Please check!
							</p>
						</div>
					)}
					<Modal.Body>
						<div className="row">
							<div className="col-12 col-md-3">
								<label style={{ fontWeight: 600, fontSize: '1.2em' }}>
									Date
								</label>
								<input
									disabled
									type="date"
									className="form-control"
									value={inputs.date?.value}
								/>
							</div>
							<div className="col-12 col-md-3">
								<label style={{ fontWeight: 600, fontSize: '1.2em' }}>
									Company
								</label>
								<div class="form-group">
									<select
										class="form-control mb-2"
										id="company"
										value={inputs.cid?.value}
										onChange={e =>
											inputTextChangeHandler('cid', e.target.value)
										}>
										{userCompanies.map(company => (
											<option
												key={company.cid}
												value={company.cid}
												selected={
													+company.cid === +inputs.cid.value
														? +company.cid
														: userCompanies[0].cid
												}>
												{companies.find(comp => comp.cid === company.cid)?.name}
											</option>
										))}
									</select>
								</div>
							</div>
							<div className="col-12 col-md-3">
								<label style={{ fontWeight: 600, fontSize: '1.2em' }}>
									Amount
								</label>
								<input
									type="number"
									className="form-control"
									value={inputs.amount?.value}
									onChange={e =>
										inputTextChangeHandler('amount', e.target.value)
									}
								/>
							</div>

							<div className="col-12 col-md-3">
								<label style={{ fontWeight: 600, fontSize: '1.2em' }}>
									Payment Type
								</label>
								<div class="form-group">
									<select
										class="form-control mb-2"
										id="methode"
										value={inputs.methode?.value}
										onChange={e =>
											inputTextChangeHandler('methode', e.target.value)
										}>
										<option value="" disabled>
											Card / Cash / Cheque
										</option>
										<option value="card">Card</option>
										<option value="cash">Cash</option>
										<option value="cheque">Cheque</option>
										<option value="transfer">Bank Transfer</option>
										<option value="deposite">Bank Deposite</option>
									</select>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-12 ">
								<label style={{ fontWeight: 600, fontSize: '1.2em' }}>
									Narration
								</label>
								<textarea
									rows={5}
									value={inputs.narration?.value}
									onChange={e =>
										inputTextChangeHandler('narration', e.target.value)
									}
									style={{
										marginInline: 'auto',
										width: '100%',
										height: 'auto',
										border: '2px solid blue',
										borderRadius: '5px'
									}}></textarea>
							</div>
						</div>

						<div className="row">
							{clickedRow?.filename !== null &&
								clickedRow?.filename !== 'null' && (
									<label style={{ fontWeight: 600, fontSize: '1.2em' }}>
										Image
									</label>
								)}
							{previewUrl ? (
								<img
									src={previewUrl}
									alt="preview"
									style={{ width: '100%', maxHeight: '50vh' }}
								/>
							) : (
								clickedRow?.filename !== null &&
								clickedRow?.filename !== 'null' && (
									<img
										src={`http://localhost:5000/uploads/${clickedRow?.filename}`}
										alt="Uploaded"
										style={{ width: '100%', maxHeight: '50vh' }}
									/>
								)
							)}
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant="danger"
							onClick={pickImageHandler}
							style={{ marginRight: 'auto' }}>
							Upload Image
						</Button>
						<Button variant="primary" onClick={submitHandler}>
							Submit
						</Button>
					</Modal.Footer>
				</Modal>
			)}
		</>
	)
}

export default ExpanseModel
