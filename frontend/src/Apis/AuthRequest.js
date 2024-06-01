import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000/' })
// const API = axios.create({ baseURL: 'https://account-back-4krv.onrender.com' })

export const logIn = formData => API.post('/user/signin', formData)
export const logout = token => API.post(`/user/logout/${token}`)
export const logoutUserAccount = id => API.put(`/user/logoutUserAccount/${id}`)
export const autoLogin = token => API.post(`/user/autoLogin/${token}`)
