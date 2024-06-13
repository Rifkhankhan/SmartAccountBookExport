import axios from 'axios'

const API = axios.create({
	baseURL:
		process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '',
	withCredentials: true // Include credentials (cookies)
})
// const API = axios.create({ baseURL: 'https://account-back-4krv.onrender.com' })

export const logIn = formData => API.post('/user/signin', formData)
export const logout = () => API.post(`/user/logout`)
export const logoutUserAccount = id => API.put(`/user/logoutUserAccount/${id}`)
export const autoLogin = () => API.post(`/user/autoLogin`)
