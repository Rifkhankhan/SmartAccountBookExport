// FileUpload.js
import React, { useState } from 'react'
import axios from 'axios'

const FileUpload = () => {
	const [file, setFile] = useState(null)
	console.log(file)
	const onChange = e => {
		setFile(e.target.files[0])
	}

	const onSubmit = async e => {
		e.preventDefault()
		const formData = new FormData()
		formData.append('file', file)

		// try {
		// 	const response = await axios.post(
		// 		'http://localhost:3001/upload',
		// 		formData,
		// 		{
		// 			headers: {
		// 				'Content-Type': 'multipart/form-data'
		// 			}
		// 		}
		// 	)
		// 	console.log(response.data)
		// } catch (error) {
		// 	console.error('Error uploading file: ', error)
		// }
	}

	return (
		<form onSubmit={onSubmit}>
			<input type="file" onChange={onChange} style={{ display: 'none' }} />
			<button type="submit" style={{ display: 'none' }}>
				Upload
			</button>
		</form>
	)
}

export default FileUpload
