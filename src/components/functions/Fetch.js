import { useEffect } from 'react'
import { storeUser, storeUsersList } from '../../services/storage'
import { isAuthenticated, isAdmin, logout } from '../../services/auth'
import { api } from '../../services/api'

const Fetch = ({ history }) => {
    const getData = async () => {
        try {
            if (isAuthenticated()) {
                if (isAdmin()) {
                    const { status, data } = await api.get('/users')

                    if (status === 200) {
                        storeUsersList(data.users)
                    }
                } else {
                    const { status, data } = await api.get('/user/data')

                    if (status === 200) {
                        storeUser(data.user)
                    }
                }

                history.push('/dashboard')
            } else {
                history.push('/login')
            }
        } catch (err) {
            console.log(err?.message ?? err?.response?.data?.message)
            logout()
            history.push('/login')
        }
    }

    useEffect(() => {
        getData()
        // eslint-disable-next-line
    }, [])

    return null
}

export default Fetch
