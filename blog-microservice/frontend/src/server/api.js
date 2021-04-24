import axios from 'axios'

const apiPost = axios.create({
  baseURL: 'http://localhost:4000'
})

const apiComment = axios.create({
  baseURL: 'http://localhost:4001'
})

export { apiPost, apiComment }