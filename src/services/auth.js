import { clearData } from './storage'

const isAuthenticated = () => localStorage.getItem('JWT') !== null

const isAdmin = () => localStorage.getItem('is-admin') !== null

const getToken = () => localStorage.getItem('JWT')

const login = token => localStorage.setItem('JWT', token)

const adminLogin = token => {
    localStorage.setItem('JWT', token)
    localStorage.setItem('is-admin', true)
}

const logout = () => {
    clearData('all')
}

export {
    isAuthenticated,
    isAdmin,
    getToken,
    login,
    adminLogin,
    logout
}
