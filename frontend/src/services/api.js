import axios from 'axios'
import useAuthStore from '@/store/authStore'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle responses
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout()
    }
    return Promise.reject(error)
  }
)

export const authAPI = {
  login: (email, password) =>
    apiClient.post('/auth/login', { email, password }),

  signup: (userData) =>
    apiClient.post('/auth/signup', userData),

  getProfile: () =>
    apiClient.get('/auth/profile'),

  updateProfile: (userData) =>
    apiClient.put('/auth/profile', userData),
}

export default apiClient
