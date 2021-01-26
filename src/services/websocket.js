import storage from './storage'
import api from './api'
import io from 'socket.io-client'

let socket = {}

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

        socket = io(api.baseURL)

        socket.on('disconnect', () => {
            console.log('WEBSOCKET DESCONECTADO')
        })

        socket.emit('auth', {
            token: storage.read('JWT'),
            userId: storage.read('user')._id
        })

        socket.on('auth', ({ ok }) => {
            if (ok) {
                socket.emit('listen', {
                    devicesList
                })

                console.log(`WEBSOCKET CONECTADO: ${socket.id}`)
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

        socket.on('notification', async ({ event }) => {
            if (['user created', 'user updated', 'user deleted']
                .find(item => item === event)
            ) {
                const result = await api.getUserData(storage.read('user')._id)

                if (result === 'OK') {
                    window.location.reload()
                } else {
                    console.log('ERRO LOCAL: DADOS DE USUÁRIO DESATUALIZADOS')
                }
            }
        })
    } catch (err) {
        console.log(`ERRO LOCAL: ${err.message}`)
    }
}

const disconnect = () => {
    if (socket.connected) {
        socket.disconnect()
    }
}

export default {
    config,
    disconnect
}
