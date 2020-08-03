import { clearData } from './storage'

const TOKEN_KEY = 'jwt'
const IS_ADMIN_KEY = 'is-admin'

const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null

const isAdmin = () => localStorage.getItem(IS_ADMIN_KEY) !== null

const getToken = () => localStorage.getItem(TOKEN_KEY)

const login = token => localStorage.setItem(TOKEN_KEY, token)

const adminLogin = token => {
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(IS_ADMIN_KEY, true)
}

const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(IS_ADMIN_KEY)
    clearData('all')
}

export { isAuthenticated, isAdmin, getToken, login, adminLogin, logout }
