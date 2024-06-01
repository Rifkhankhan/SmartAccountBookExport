import React, { useEffect, useRef, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import styles from './AdvanceModel.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faClose,
	faDownload,
	faPager,
	faPen,
	faPrint
} from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import image from './../../Images/SCIT_LOGO.png'

import { updateAccountRequest } from '../../Actions/AccountRequestActions'
import jsPDF from 'jspdf'
const AdvanceModel = ({
	type,
	clickedRow,
	showModal,
	closeHandler,
	deleteHandler,
	currentUser,

	companies,
	userCompanies
}) => {
	const [showEditModal, setShowEditModal] = useState(false)
	const [formSubmit, setFormSubmit] = useState(false)
	const [formValid, setFormValid] = useState(true)
	const dispatch = useDispatch()
	const [previewUrl, setPreviewUrl] = useState()
	const [file, setFile] = useState()
	// initialInputsState
	const { balance, ...rest } = clickedRow
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
	const initialInputsState = {
		...rest,
		date: {
			value: new Date(clickedRow?.date).toISOString()?.split('T')[0],
			isValid: true
		},
		amount: { value: +clickedRow?.amount, isValid: true },
		cid: { value: +clickedRow?.cid, isValid: true },
		narration: { value: clickedRow?.narration, isValid: true },
		requestForm: { value: clickedRow?.requestForm, isValid: true },
		id: { value: currentUser?.id, isValid: true },
		methode: { value: clickedRow?.methode, isValid: true },

		requestType: { value: clickedRow?.requestType, isValid: true }
	}

	const [inputs, setInputs] = useState(initialInputsState)

	useEffect(() => {
		setFormValid(
			inputs.amount.isValid &&
				inputs.cid?.isValid &&
				inputs.requestForm.isValid &&
				inputs.methode.isValid &&
				inputs.narration.isValid
		)

		return () => {}
	}, [inputs])

	const inputTextChangeHandler = (inputType, enteredValue) => {
		setInputs(currentInputValue => {
			return {
				...currentInputValue,
				[inputType]: { value: enteredValue, isValid: true }
			}
		})
	}

	const submitHandler = () => {
		const data = {
			...rest,

			date: inputs.date.value,

			cid: inputs.cid?.value,

			narration: inputs.narration.value,
			amount: +inputs.amount.value,
			id: inputs.id.value,
			requestForm: inputs.requestForm.value,
			methode: inputs.methode.value,
			requestType: inputs.requestType.value
		}

		const narrationValid = data.narration?.trim().length > 0
		const categoryValid = data.requestForm?.trim().length > 0
		const companyValid = +data.cid !== null
		const methodeValid = data.methode?.trim().length > 0
		const amountValid = +data.amount > 0
		if (
			!narrationValid ||
			!amountValid ||
			!categoryValid ||
			!methodeValid ||
			!companyValid
		) {
			setInputs(currentInputs => {
				return {
					...rest,
					narration: {
						value: currentInputs.narration.value,
						isValid: narrationValid
					},
					amount: {
						value: +currentInputs.amount.value,
						isValid: amountValid
					},
					cid: {
						value: currentInputs.cid.value,
						isValid: companyValid
					},
					requestForm: {
						value: currentInputs.requestForm.value,
						isValid: categoryValid
					},
					methode: {
						value: currentInputs.methode.value,
						isValid: methodeValid
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

		setFormSubmit(true)
		setShowEditModal(false)

		setInputs(initialInputsState)
		closeHandler()
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
		doc.text('Advance Report', 50, 25)
		// Add the date to the PDF document
		// Define column headers
		var columns = [
			{ header: 'Date', dataKey: 'col1' },
			{ header: 'Company', dataKey: 'col2' },

			{ header: 'Amount', dataKey: 'col3' },
			{ header: 'Paid / Received', dataKey: 'col4' },

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
				col4: inputs.requestType.value === 'got' ? 'Received' : 'Paid',

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
		const filename = `Advance(${currentTimeWithDate}).pdf`
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

		doc.text('Advance Report', 50, 25)

		// Define column headers
		var columns = [
			{ header: 'Date', dataKey: 'col1' },
			{ header: 'Company', dataKey: 'col2' },

			{ header: 'Amount', dataKey: 'col3' },
			{ header: 'Paid / Received', dataKey: 'col4' },
			{ header: 'Payment Type', dataKey: 'col45' },
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
				col33: inputs.amount.value,
				col4: inputs.requestType.value === 'got' ? 'Received' : 'Paid',
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
	// conver time

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

							{currentUser.advancePermission === 'yes' &&
								currentUser.advanceEditPermission === 'yes' && (
									<FontAwesomeIcon
										className={styles.editBtn}
										icon={faPen}
										onClick={() => setShowEditModal(current => !current)}
									/>
								)}
						</div>
					</Modal.Header>
					<Modal.Body>
						<div className="row">
							<div className="col-12 col-md-3">
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
							<div className="col-12 col-md-3">
								<label style={{ fontWeight: 600, fontSize: '1.2em' }}>
									Amount
								</label>
								<p>{inputs.amount.value}</p>
							</div>
							<div className="col-12 col-md-3">
								<label style={{ fontWeight: 600, fontSize: '1.2em' }}>
									Paid / Received
								</label>
								<p>
									{inputs.requestForm.value === 'got' ? 'Received' : 'Paid'}
								</p>
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
						{currentUser.advancePermission === 'yes' &&
							currentUser.advanceDeletePermission === 'yes' && (
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
							<div className="col-12 col-md-6">
								<label style={{ fontWeight: 600, fontSize: '1.2em' }}>
									Date
								</label>
								<input
									disabled
									type="date"
									className="form-control"
									value={inputs.date.value}
									onChange={e => inputTextChangeHandler('date', e.target.value)}
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
							<div className="col-12 col-md-6">
								<label style={{ fontWeight: 600, fontSize: '1.2em' }}>
									Amount
								</label>
								<input
									type="number"
									className="form-control"
									value={inputs.amount.value}
									onChange={e =>
										inputTextChangeHandler('amount', e.target.value)
									}
								/>
							</div>
						</div>
						<div class="form-row row">
							<div class="col-md-6 col-sm-6 my-1">
								<div class="form-group">
									<label style={{ fontWeight: 600, fontSize: '1.2em' }}>
										Paid / Received
									</label>
									<select
										class="form-control mb-2"
										id="requestForm"
										value={inputs.requestForm.value}
										onChange={e =>
											inputTextChangeHandler('requestForm', e.target.value)
										}>
										<option value="got">Received</option>
										<option value="paid">Paid</option>
									</select>
								</div>

								<div class="form-group">
									<label style={{ fontWeight: 600, fontSize: '1.2em' }}>
										Card / Cash / Cheque
									</label>
									<select
										class="form-control mb-2"
										id="methode"
										value={inputs.methode.value}
										onChange={e =>
											inputTextChangeHandler('methode', e.target.value)
										}>
										<option value="card">Card</option>
										<option value="cash">Cash</option>
										<option value="cheque">Cheque</option>
										<option value="transfer">Bank Transfer</option>
										<option value="deposite">Bank Deposite</option>
									</select>
								</div>
							</div>
							<div class="col-md-6 col-sm-6 my-1">
								<div class="form-group">
									<label style={{ fontWeight: 600, fontSize: '1.2em' }}>
										Narration
									</label>
									<textarea
										type="narration"
										class="form-control"
										id="narration"
										placeholder="Narration"
										value={inputs.narration.value}
										rows={4}
										onChange={e =>
											inputTextChangeHandler('narration', e.target.value)
										}
									/>
								</div>
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

export default AdvanceModel
