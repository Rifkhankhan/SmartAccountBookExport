import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000/' })

// const API = axios.create({ baseURL: 'https://account-back-4krv.onrender.com' })

// export const getUser = (userId) => API.get(`user/${userId}`);

export const createCustomer = formData => API.post('/user/createUser', formData)
export const getCustomer = id => API.get(`/user/${id}`)
export const deleteCustomer = id => API.delete(`/user/${id}`)
export const getCustomers = () => API.get('/user')
export const getUserActivities = () => API.get('/user/activities')
export const updateCustomer = (id, formData) => API.put(`/user/${id}`, formData)
export const resetPassword = id => API.put(`/user/reset/${id}`)
export const updatePassword = (id, formData) =>
	API.put(`/user/updatePassword/${id}`, formData)
export const activateToggle = id => API.put(`/user/activate/${id}`)
