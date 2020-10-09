import { getToken } from './auth'
import { getData } from './storage'
import { baseURL } from './api'
import io from 'socket.io-client'

const realTimeBuffer = []

const realTimeConfig = consumerUnitIndex => {
    try {
        const devicesList = getData('user')
            .consumerUnits[consumerUnitIndex]
            .devices.map(device => device)

        devicesList.forEach(() => {
            realTimeBuffer.push({})
        })

        const socket = io(baseURL)

        socket.emit('auth', {
            token: getToken()
        })

        socket.on('auth', ({ ok }) => {
            if (ok) {
                socket.emit('listen', {
                    devicesList
                })
            }
        })

        socket.on('data', ({ topic, payload }) => {
            try {
                devicesList.forEach((device, index) => {
                    if (device.id === topic) {
                        realTimeBuffer[index] = JSON.parse(payload)
                    }
                })
            } catch (err) {
                console.log(err.message)
            }
        })
    } catch (err) {
        console.log(err.message)
    }

}

export {
    realTimeConfig,
    realTimeBuffer
}