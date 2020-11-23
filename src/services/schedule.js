import api from './api'
import storage from './storage'

const schedule = {
    updateUser: () => {
        const retry = async () => {
            if (!(await api.updateUser(storage.read('user')) === 'OK')) {
                setTimeout(retry, 5000)
            }
        }
        retry()
    }
}

export default schedule
