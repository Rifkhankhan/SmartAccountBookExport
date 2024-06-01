import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { GridLoader } from 'react-spinners'
import ClipLoader from 'react-spinners/ClipLoader'
import './LoadingSpinner.css'
const LoadingSpinner = props => {
	const [size, setSize] = useState(50)

	const override = {
		display: 'block',
		margin: '0 auto',
		borderColor: 'red',
		background: 'transparent'
	}

	return (
		<div className="sweet-loading">
			<Modal
				show={true} // Ensure the modal is set to be shown
				centered // Center the modal
				size="md"
				dialogClassName="modal-90w" // Adjust the size of the modal
			>
				<Modal.Body
					className="transparent-modal-body"
					style={{
						textAlign: 'center',
						backgroundColor: 'transparent'
					}}>
					{' '}
					{/* Adjust text alignment */}
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							backgroundColor: 'transparent',
							color: 'transparent'
						}}>
						{' '}
						{/* Center the spinner */}
						<GridLoader
							color="#36d7b7"
							loading={true}
							css={override}
							size={size}
							aria-label="Loading Spinner"
							data-testid="loader"
						/>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	)
}

export default LoadingSpinner
