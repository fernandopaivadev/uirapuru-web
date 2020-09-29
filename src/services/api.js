import { create } from 'axios'
import { isAuthenticated, getToken } from './auth'

const baseURL = 'https://api.techamazon.tech'
// const baseURL = 'https://techamazon-uirapuru-api.herokuapp.com'

const api = create({
    baseURL
})

api.interceptors.request.use(async config => {
    if (isAuthenticated()) {
        config.headers.authorization = `Bearer ${getToken()}`
    }
    return config
})

export { api, baseURL }
