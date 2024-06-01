import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000/' })
// const API = axios.create({ baseURL: 'https://account-back-4krv.onrender.com' })

// export const getUser = (userId) => API.get(`user/${userId}`);

export const createAccountRequest = formData =>
	API.post('/accountRequest', formData)

export const importAccountRequest = formData =>
	API.post('/accountRequest/import', formData)
export const getAccountRequest = id => API.get(`/accountRequest/${id}`)
export const disableAccountRequest = formData =>
	API.put(`/accountRequest/disable/${formData.arid}`, formData)
export const getAccountRequests = () => API.get('/accountRequest')
export const updateAccountRequest = (id, formData) =>
	API.put(`/accountRequest/${id}`, formData)

// company

export const createCompany = formData => API.post('/company', formData)
export const getcompanies = formData => API.get('/company')
export const getUserComponies = id => API.get(`/company/${id}`)
