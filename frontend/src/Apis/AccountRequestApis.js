import axios from 'axios'

const API = axios.create({
	baseURL:
		process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : '',
	withCredentials: true // Include credentials (cookies)
})

export const createAccountRequest = formData =>
	API.post('/accountRequest', formData)
export const getAccountRequest = id => API.get(`/accountRequest/${id}`)
export const disableAccountRequest = formData =>
	API.put(`/accountRequest/disable/${formData.arid}`, formData)
export const getAccountRequests = () => API.get('/accountRequest')
export const updateAccountRequest = (id, formData) =>
	API.put(`/accountRequest/${id}`, formData)
export const importAccountRequest = formData =>
	API.post('/accountRequest/import', formData)
