import storage from './storage'
import api from './api'
import io from 'socket.io-client'

let socket = {}

const config = async ({
    consumerUnitIndex,
    realTimeBuffer,
    setRealTimeBuffer,
    setNewMessage
}) => {
    try {
        const user = await storage.read('user')
        const token = await storage.read('JWT')
        const devicesList = user
            .consumerUnits[consumerUnitIndex]
            .devices.map(device => device.id)

        setRealTimeBuffer(new Array(devicesList.length).fill())

        socket = io(api.baseURL)

        socket.on('disconnect', () => {
            console.log('WEBSOCKET DESCONECTADO')
            socket = io(api.baseURL)
        })

        socket.emit('auth', {
            token: token,
            userId: user._id
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

                        // delete parsedPayload.rtc
                        // delete parsedPayload.store
                        // delete parsedPayload.id

                        _buffer[index] = {
                            'T': parsedPayload['T'],
                            'U.R.': parsedPayload['U.R.']
                        }
                        setRealTimeBuffer(_buffer)
                        setNewMessage(true)
                    }
                })
            } catch (err) {
                console.log(`ERRO LOCAL: ${err.message}`)
            }
        })

        socket.on('notification', async ({ event }) => {
            if (['user created', 'user updated']
                .find(item => item === event)
            ) {
                const result = await api.getUserData(user._id)

                if (result === 'OK') {
                    window.location.reload()
                } else {
                    console.log('ERRO LOCAL: DADOS DE USUÁRIO DESATUALIZADOS')
                }
            } else if (event === 'user deleted') {
                const isAdmin = user.accessLevel === 'admin'

                if(isAdmin) {
                    window.location.replace(
                    `${window.location.href.split('#')[0]}#/users-list`
                    )
                } else {
                    await storage.clear('all')
                    window.location.replace(
                    `${window.location.href.split('#')[0]}#/users-list`
                    )
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
