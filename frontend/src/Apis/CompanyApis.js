import axios from 'axios'

const API = axios.create({
	baseURL:
		process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : '',
	withCredentials: true // Include credentials (cookies)
})

export const createCompany = formData => API.post('/company', formData)
export const getUserComponies = id => API.get(`/company/${id}`)

export const getcompanies = () => API.get('/company')
