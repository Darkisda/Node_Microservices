import axios from 'axios'

const apiPost = axios.create({
  baseURL: 'http://posts.com'
})

const apiComment = axios.create({
  baseURL: 'http://posts.com'
})

const apiEvent = axios.create({
  baseURL: 'http://posts.com'
})

export { apiPost, apiComment, apiEvent }