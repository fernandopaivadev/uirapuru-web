import storage from './storage'
import api from './api'
import io from 'socket.io-client'

const config = (
    consumerUnitIndex,
    realTimeBuffer,
    setRealTimeBuffer,
    setNewMessage
) => {
    try {
        const devicesList = storage.read('user')
            .consumerUnits[consumerUnitIndex]
            .devices.map(device => device.id)

        setRealTimeBuffer(new Array(devicesList.length).fill({}))

        const socket = io(api.baseURL)

        socket.emit('auth', {
            token: storage.read('JWT')
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
                        delete parsedPayload.id

                        _buffer[index] = parsedPayload
                        setRealTimeBuffer(_buffer)
                        setNewMessage(true)
                    }
                })
            } catch (err) {
                console.log(`ERRO LOCAL: ${err.message}`)
            }
        })

        const admin = storage.read('access-level')

        socket.on('notification', async ({ event }) => {
            if (admin) {
                if (event in ['user created', 'user updated', 'user removed']) {
                    window.location.replace(
                    `${window.location.href.split('#')[0]}#/users-list`
                    )
                }
            } else {
                if(await api.getUserData() === 'OK') {
                    window.location.replace(
                    `${window.location.href.split('#')[0]}#/profile`
                    )
                }
            }
        })
    } catch (err) {
        console.log(`ERRO LOCAL: ${err.message}`)
    }
}

export default {
    config
}
