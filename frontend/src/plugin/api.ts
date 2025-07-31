import axios from 'axios'

const isDevelopment = import.meta.env.MODE === 'development'

console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL)

export const api = axios.create({

  baseURL: isDevelopment
    ? import.meta.env.VITE_API_BASE_URL
    : import.meta.env.VITE_API_BASE_URL,
})
