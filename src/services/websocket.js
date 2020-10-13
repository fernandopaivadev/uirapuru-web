
import { getToken } from './auth'
import { getData } from './storage'
import { baseURL } from './api'
import io from 'socket.io-client'

const websocketConfig = (
    consumerUnitIndex,
    realTimeBuffer,
    setRealTimeBuffer,
    setNewMessage
) => {
    try {
        const devicesList = getData('user')
            .consumerUnits[consumerUnitIndex]
            .devices.map(device => device.id)

        setRealTimeBuffer(new Array(devicesList.length).fill({}))

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
                        const _buffer = realTimeBuffer
                        _buffer[index] = JSON.parse(payload)
                        setRealTimeBuffer(_buffer)
                        setNewMessage(true)
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