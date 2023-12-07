import axios from 'axios'

const baseUrl = import.meta.env.VITE_BASE_URL

const baseService = axios.create({
  baseURL: baseUrl,
  withCredentials: false,
})

export { baseService }
