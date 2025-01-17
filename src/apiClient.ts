import axios, { type RawAxiosRequestHeaders } from 'axios'

const headers: RawAxiosRequestHeaders = {}

export default axios.create({
  headers,
})
