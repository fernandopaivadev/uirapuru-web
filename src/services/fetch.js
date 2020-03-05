import { storeUser, storeUsersList } from './storage'
import { isAuthenticated, isAdmin, logout } from './auth'
import { api } from './api'

const fetch = async () => {
    if (isAuthenticated()) {
        try {
            if (isAdmin()) {
                const { status, data } = await api.get('/users')

                if (status === 200) {
                    storeUsersList(data?.users)
                }
            } else {
                const { status, data } = await api.get('/user/data')

                if (status === 200) {
                    storeUser(data?.user)
                }
            }

            return true
        } catch (err) {
            console.log(err?.message ?? err?.response?.data?.message)
            logout()
            return false
        }
    }
}

export default fetch
