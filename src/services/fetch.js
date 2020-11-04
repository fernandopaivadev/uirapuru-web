import { getData, storeData, clearData } from './storage'
import { isAuthenticated, isAdmin } from './auth'
import { api } from './api'

const fetchDeviceData = async (
    consumerUnitIndex,
    deviceIndex,
    begin,
    end,
    fullTimestamp,
    storeMessages
) => {
    if (!(begin && end)) {
        begin = new Date()
        end = new Date()

        begin.setMinutes(begin.getMinutes() - 1)

        begin = begin.toISOString()
        end = end.toISOString()
    }

    const device = getData('user')
        .consumerUnits[consumerUnitIndex]
        .devices[deviceIndex]

    const response = await api.get(
        `/device/messages?device=${
            device.id
        }&from=${
            begin
        }&to=${
            end
        }`
    )

    const { status } = response

    if (status === 200) {
        const { messages } = response.data
        const params = []
        const timestamps = []

        if (!messages.length) {
            return null
        }

        if (storeMessages) {
            storeData('messages', messages)
        }

        messages.forEach(({ payload }) => {
            const parsedPayload = JSON.parse(payload)
            const dateRTC = new Date(parsedPayload.rtc)

            const timestamp = fullTimestamp ?
            `${
                dateRTC.getDate() < 10 ?
                    `0${dateRTC.getDate()}`
                    :
                    dateRTC.getDate()
            }/${
                dateRTC.getMonth() + 1 < 10 ?
                    `0${dateRTC.getMonth() + 1}`
                    :
                    dateRTC.getMonth() + 1
            } ${
                dateRTC.getHours() < 10 ?
                    `0${dateRTC.getHours()}`
                    :
                    dateRTC.getHours()
            }:${
                dateRTC.getMinutes() < 10 ?
                    `0${dateRTC.getMinutes()}`
                    :
                    dateRTC.getMinutes()
            }`
            :
            `${
                dateRTC.getHours() < 10 ?
                    `0${dateRTC.getHours()}`
                    :
                    dateRTC.getHours()
            }:${
                dateRTC.getMinutes() < 10 ?
                    `0${dateRTC.getMinutes()}`
                    :
                    dateRTC.getMinutes()
            }`

            delete parsedPayload.rtc
            delete parsedPayload.store
            params.push(parsedPayload)
            timestamps.push(timestamp)
        })

        const keys = Object.keys(params[0])
        const datasets = keys.map(key => ({
            label: key,
            data: params.map(param =>
                param[key]
            )
        }))

        const title = device.name

        const chart = {
            title,
            timestamps,
            datasets
        }

        return chart
    }
}

const fetch = {
    usersList: async () => {
        clearData('collection')
        clearData('messages')

        try {
            if (isAdmin()) {
                const { status, data } = await api.get('/users')

                if (status === 200) {
                    storeData('users-list', data.usersList)
                    return true
                }
            }
        } catch (err) {
            console.log(err?.message ?? err?.response?.data?.message)
            return false
        }
    },
    userData: async (_id) => {
        clearData('collection')
        clearData('messages')

        try {
            if (isAdmin() && _id) {
                const { status, data } = await api.get(
                    `/user/data?_id=${_id}`
                )

                if (status === 200) {
                    storeData('user', data.user)

                    return true
                }
            } else if (isAuthenticated()) {
                const { status, data } = await api.get('/user/data')

                if (status === 200) {
                    storeData('user', data.user)
                    return true
                }
            }
        } catch (err) {
            console.log(err?.message ?? err?.response?.data?.message)
            return false
        }
    },
    deviceData: async (consumerUnitIndex, deviceIndex, begin, end) => {
        clearData('collection')
        clearData('messages')

        try {
            if (deviceIndex >= 0) {
                const deviceData = await fetchDeviceData(
                    consumerUnitIndex,
                    deviceIndex,
                    begin,
                    end,
                    true,
                    true
                )

                if (deviceData) {
                    const collection = [deviceData]
                    storeData('collection', collection)
                    return true
                } else {
                    return false
                }
            }
        } catch (err) {
            console.log(err?.message ?? err?.response?.data?.message)
            return false
        }
    },
    devicesData: async (consumerUnitIndex, begin, end) => {
        clearData('collection')
        clearData('messages')

        try {
            if (consumerUnitIndex >= 0) {
                const collection = await Promise.all(getData('user')
                    .consumerUnits[consumerUnitIndex]
                    .devices.map(async (device, deviceIndex) =>
                        await fetchDeviceData(
                            consumerUnitIndex,
                            deviceIndex,
                            begin,
                            end,
                            false,
                            false
                        )
                    ))

                const successful = collection.map(chart => {
                    if (chart) {
                        return true
                    }
                })

                if (successful) {
                    storeData('collection', collection)
                    return true
                } else {
                    return false
                }
            }
        } catch (err) {
            console.log(err?.message ?? err?.response?.data?.message)
            return false
        }
    }
}

export default fetch