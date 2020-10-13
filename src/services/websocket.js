import { getToken } from './auth'
import { getData, storeData } from './storage'
import { baseURL } from './api'
import io from 'socket.io-client'

const websocketConfig = consumerUnitIndex => {
    try {
        const devicesList = getData('user')
            .consumerUnits[consumerUnitIndex]
            .devices.map(device => device.id)

        storeData(
            'real-time-buffer',
            new Array(devicesList.length).fill({})
        )

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
                devicesList.forEach((id, index) => {
                    if (id === topic) {
                        const _buffer = getData('real-time-buffer')
                        _buffer[index] = JSON.parse(payload)
                        storeData('real-time-buffer', _buffer)
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
    websocketConfig
}