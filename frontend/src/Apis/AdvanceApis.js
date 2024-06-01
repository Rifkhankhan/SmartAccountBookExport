import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000/' })
// const API = axios.create({ baseURL: 'https://account-back-4krv.onrender.com' })

// export const getUser = (userId) => API.get(`user/${userId}`);

export const createAdvance = formData => API.post('/advance', formData)
export const getAdvance = id => API.get(`/advance/${id}`)
export const deleteAdvance = id => API.delete(`/advance/${id}`)
export const getAdvances = () => API.get('/advance')
export const updateAdvance = (id, formData) =>
	API.put(`/advance/${id}`, formData)
