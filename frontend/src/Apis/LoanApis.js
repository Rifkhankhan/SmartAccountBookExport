import axios from 'axios'

// const API = axios.create({ baseURL: 'http://localhost:5000/' })
// const API = axios.create({ baseURL: 'https://account-back.onrender.com/' })
const API = axios.create({ baseURL: 'https://account-back-4krv.onrender.com' })

// export const getUser = (userId) => API.get(`user/${userId}`);

export const createLoan = formData => API.post('/loan', formData)
export const getLoan = id => API.get(`/loan/${id}`)
export const deleteLoan = id => API.delete(`/loan/${id}`)
export const getLoans = () => API.get('/loan')
export const updateLoan = (id, formData) => API.put(`/loan/${id}`, formData)
