import axios from 'axios'

// const API = axios.create({ baseURL: 'http://localhost:5000/' })
// const API = axios.create({ baseURL: 'https://account-back.onrender.com/' })
const API = axios.create({ baseURL: 'https://account-back-4krv.onrender.com' })

// export const getUser = (userId) => API.get(`user/${userId}`);

export const createReceipt = formData => API.post('/receipt', formData)
export const getReceipt = id => API.get(`/receipt/${id}`)
export const deleteReceipt = id => API.delete(`/receipt/${id}`)
export const getReceipts = () => API.get('/receipt')
export const updateReceipt = (id, formData) =>
	API.put(`/receipt/${id}`, formData)
