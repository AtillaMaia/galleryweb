import axios from 'axios'

const getAPI = axios.create({
    baseURL: 'https://galleryapianchorstest.herokuapp.com',
    // baseURL: 'http://127.0.0.1:8000',
    // timeout: 1000,
})

export { getAPI }