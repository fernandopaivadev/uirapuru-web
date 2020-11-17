import api from './api'
import { getData } from './storage'

const schedule = {
    updateUser: () => {
        const retry = async () => {
            console.log('Updating')
            if (!(await api.updateUser(getData('user')) === 'OK')) {
                setTimeout(retry, 5000)
            }
        }
        retry()
    }
}

export default schedule