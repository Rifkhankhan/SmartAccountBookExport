import axios from 'axios'

// const API = axios.create({ baseURL: 'http://localhost:5000/' })
// const API = axios.create({ baseURL: 'https://account-back.onrender.com/' });
const API = axios.create({ baseURL: 'https://account-back-4krv.onrender.com' })

// export const getUser = (userId) => API.get(`user/${userId}`);

export const createExpanse = formData => API.post('/expanse', formData)
export const getExpanse = id => API.get(`/expanse/${id}`)
export const deleteExpanse = id => API.delete(`/expanse/${id}`)
export const getExpanses = () => API.get('/expanse')
export const updateExpanse = (id, formData) =>
	API.put(`/expanse/${id}`, formData)
