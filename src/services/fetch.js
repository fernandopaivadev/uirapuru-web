import { storeUser, storeUsersList } from './storage'
import { isAuthenticated, isAdmin, logout } from './auth'
import { api } from './api'

const fetch = async (_id) => {
    if (isAuthenticated()) {
        try {
            if (isAdmin()) {
                if (_id) {
                    const { status, data } = await api.get(
                        `/user/data?_id=${_id}`
                    )

                    if (status === 200) {
                        storeUser(data?.user)
                    }
                } else {
                    const { status, data } = await api.get('/users')

                    if (status === 200) {
                        storeUsersList(data?.usersList)
                    }
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
