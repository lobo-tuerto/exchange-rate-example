import axios from 'axios'

const baseUrl = 'https://www.alphavantage.co'

const baseService = axios.create({
  baseURL: baseUrl,
  withCredentials: false,
})

export { baseService }
