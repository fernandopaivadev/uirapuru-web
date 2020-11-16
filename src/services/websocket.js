
import { getData } from './storage'
import api from './api'
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

        const socket = io(api.baseURL)

        socket.emit('auth', {
            token: getData('JWT')
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
                        const parsedPayload = JSON.parse(payload)
                        delete parsedPayload.rtc
                        delete parsedPayload.store
                        _buffer[index] = parsedPayload
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