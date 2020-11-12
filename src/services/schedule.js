import { api } from './api'
import { getData } from './storage'

const schedule = {
    updateUser: () => {
        const retry = async () => {
            console.log('Updating')
            try {
                await api.put('/user/update', getData('user'))
            } catch (err) {
                setTimeout(retry, 5000)
            }
        }
        retry()
    }
}

export default schedule