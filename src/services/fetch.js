import { getData, storeData } from './storage'
import { isAuthenticated, isAdmin, logout } from './auth'
import { api } from './api'

const fetch = async (_id, consumerUnitIndex, deviceIndex) => {
    try {
        if (_id && consumerUnitIndex && deviceIndex) {
            const begin = new Date()
            const end = new Date()

            begin.setMinutes(begin.getMinutes() - 1)
            const device = getData('user')
                .consumerUnits[consumerUnitIndex]
                .devices[deviceIndex]

            const response = await api.get(
                `/device/messages?device=${
                    device.id
                }&from=${begin.toISOString()
                }&to=${end.toISOString()}`
            )

            const { status } = response

            if (status === 200) {
                const { messages } = response.data
                const params = []
                const timestamps = []

                messages.forEach(({ payload }) => {
                    const parsedPayload = JSON.parse(payload)

                    params.push(parsedPayload)
                    timestamps.push(parsedPayload.rtc)
                })

                const keys = Object.keys(params)
                const datasets = []

                keys.forEach(key => {
                    datasets.push({
                        label: key,
                        data: params.map(param =>
                            param[key]
                        )
                    })
                })

                const title = device.name

                const collection = {
                    title,
                    timestamps,
                    datasets
                }

                return collection
            }
        } else if (_id && consumerUnitIndex && deviceIndex) {
            return false
        } else if (_id && consumerUnitIndex) {
            return false
        } else if (_id) {
            if (isAdmin()) {
                const { status, data } = await api.get(
                    `/user/data?_id=${_id}`
                )

                if (status === 200) {
                    storeData('user', data.user)
                    return true
                }
            }
        } else if (isAdmin()) {
            const { status, data } = await api.get('/users')

            if (status === 200) {
                storeData('users-list',data.usersList)
                return true
            }
        } else if (isAuthenticated()) {
            const { status, data } = await api.get('/user/data')

            if (status === 200) {
                storeData('user', data?.user)
                return true
            }
        }
    } catch (err) {
        console.log(err?.message ?? err?.response?.data?.message)
        logout()
        return false
    }
}

export default fetch