import { create } from 'axios'
import { isAuthenticated, getToken } from './auth'

//const baseURL = 'https://api-uirapuru.herokuapp.com/'
const baseURL = 'https://api.techamazon.tech'

const api = create({
    baseURL
})

api.interceptors.request.use(async config => {
    if (isAuthenticated) {
        config.headers.authorization = `Bearer ${getToken()}`
    }
    return config
})

export {
    api,
    baseURL
}
