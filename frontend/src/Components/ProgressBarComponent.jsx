import React, { useState, useEffect } from 'react'
import { ProgressBar } from 'react-bootstrap'

const ProgressBarComponent = ({ loading, elapsedTime }) => {
	const [progress, setProgress] = useState(0)

	useEffect(() => {
		let timer
		if (loading) {
			setProgress(0)
			timer = setInterval(() => {
				setProgress(prevProgress => {
					if (prevProgress >= 100) {
						clearInterval(timer)
						return 100
					}
					return prevProgress + 1 // Update increment as needed
				})
			}, elapsedTime / 100) // Adjust to fit the expected total time
		} else {
			setProgress(100)
			clearInterval(timer)
		}
		return () => clearInterval(timer)
	}, [loading, elapsedTime])

	return (
		<div>
			<ProgressBar
				color="black"
				animated
				now={progress}
				label={`${progress}%`}
			/>
		</div>
	)
}

export default ProgressBarComponent
