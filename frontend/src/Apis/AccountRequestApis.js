import axios from 'axios'

const API = axios.create({
	baseURL:
		process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '',
	withCredentials: true // Include credentials (cookies)
})

// const API = axios.create({ baseURL: 'https://account-back-4krv.onrender.com' })

// export const getUser = (userId) => API.get(`user/${userId}`);

export const createAccountRequest = formData =>
	API.post('/accountRequest', formData)
export const getAccountRequest = id => API.get(`/accountRequest/${id}`)
export const disableAccountRequest = formData =>
	API.put(`/accountRequest/disable/${formData.arid}`, formData)
export const getAccountRequests = () => API.get('/accountRequest')
export const updateAccountRequest = (id, formData) =>
	API.put(`/accountRequest/${id}`, formData)
