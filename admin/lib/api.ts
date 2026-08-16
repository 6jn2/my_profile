import axios from 'axios'

const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

const adminApi = axios.create({ baseURL: BASE, headers: { 'Content-Type': 'application/json', Accept: 'application/json' } })

// Attach token from localStorage on every request
adminApi.interceptors.request.use(config => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('admin_token')
    if (token) config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Redirect to login on 401
adminApi.interceptors.response.use(r => r, err => {
  if (err.response?.status === 401 && typeof window !== 'undefined') {
    localStorage.removeItem('admin_token')
    window.location.href = '/mojib-cms-x9'
  }
  return Promise.reject(err)
})

export default adminApi
