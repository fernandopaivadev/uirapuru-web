import { create } from 'axios'
import { isAuthenticated, getToken } from './auth'
import { config } from 'dotenv'

config()

const baseURL = process.env.API_URL

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
