import React, { useEffect, useState, memo } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faThermometerThreeQuarters,
    faTint,
    faBolt
} from '@fortawesome/free-solid-svg-icons'

import Layout from '../layouts/Layout'
import Graphic from '../panels/Graphic'
import { isAuthenticated, getToken } from '../../services/auth'
import { baseURL } from '../../services/api'
import { getConsumerUnit } from '../../services/storage'
import io from 'socket.io-client'

import '../../styles/dashboard.css'
import themes from '../../themes'

const Dashboard = () => {
    const [initialized, setInitialized] = useState(false)
    const [consumerUnit, setConsumerUnit] = useState({
        devices: []
    })

    const [newMessage, setNewMessage] = useState({
        isNew: false,
        topic: '',
        payload: ''
    })

    const [buffer, setBuffer] = useState([])

    const [devicePopup, setDevicePopup] = useState(false)
    const [currentDevice, setCurrentDevice] = useState(null)

    const webSocketConfig = () => {
        try {
            let devicesList = []

            consumerUnit.devices.forEach(device => {
                devicesList.push(device.id)
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
                    setNewMessage({
                        isNew: true,
                        topic,
                        payload
                    })
                } catch (err) {
                    console.log(err.message)
                }
            })
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        try {
            if (isAuthenticated()) {
                setConsumerUnit(getConsumerUnit() ?? null)
                webSocketConfig()
                setInitialized(true)
            }
        } catch (err) {
            console.log(err.message)
        }
        // eslint-disable-next-line
    }, [initialized])

    useEffect(() => {
        const { isNew, topic, payload } = newMessage

        if (isNew) {
            consumerUnit.devices.forEach((device, index) => {
                if (device.id === topic) {
                    let _buffer = [...buffer]
                    _buffer[index] = payload

                    setNewMessage({
                        isNew: false,
                        topic: '',
                        payload: ''
                    })

                    setBuffer(_buffer)
                }
            })
        }
        // eslint-disable-next-line
    }, [newMessage])

    const Card = ({ name, value }) => {
        const { t, h, v1 } = value ?? {}

        const temperature = t
        const humidity = h
        const voltage = v1

        return <div className='card'>
            <h1 className='title'>{name}</h1>
            {temperature ?
                <div className='value'
                    style={{
                        borderColor: themes.default.traceColors[0]
                    }}
                >
                    <FontAwesomeIcon
                        className='icon'
                        icon={faThermometerThreeQuarters}
                        style={{
                            color: themes.default.traceColors[0]
                        }}
                    />
                    <h1 className='text'>
                        Temperatura:
                    </h1>
                    <h1 className='payload'>
                        {temperature} °C
                    </h1>
                </div>
                : null
            }
            {humidity ?
                <div className='value'
                    style={{
                        borderColor: themes.default.traceColors[1]
                    }}
                >
                    <FontAwesomeIcon
                        className='icon'
                        icon={faTint}
                        style={{
                            color: themes.default.traceColors[1]
                        }}
                    />
                    <h1 className='text'>
                        Umidade:
                    </h1>
                    <h1 className='payload'>
                        {humidity} %
                    </h1>
                </div>
                : null
            }
            {voltage ?
                <div className='value'
                    style={{
                        borderColor: themes.default.traceColors[2]
                    }}
                >
                    <FontAwesomeIcon
                        className='icon'
                        icon={faBolt}
                        style={{
                            color: themes.default.traceColors[2]
                        }}
                    />
                    <h1 className='text'>
                        Tensão:
                    </h1>
                    <h1 className='payload'>
                        {voltage} V
                    </h1>
                </div>
                : null
            }
            {!value ?
                <h1 className='disconnected'>
                    Desconectado
                </h1>
                : null
            }
        </div>
    }

    return <div className='dashboard'>
        <Layout />
        {devicePopup ?
            <div className='dialog'>
                <h1 className='title'>
                    {currentDevice.name}
                </h1>
                <Graphic
                    device={currentDevice}
                    setDevicePopup={setDevicePopup}
                />
            </div>
            :
            consumerUnit?.devices?.length > 0 ?
                <ul className='devices'>
                    {consumerUnit.devices.map((device, index) => {
                        const value = JSON.parse(buffer[index] ?? null)

                        return <li
                            key={index}
                            onClick={() => {
                                setDevicePopup(true)
                                setCurrentDevice(device)
                            }}>
                            <Card name={device.name} value={value} />
                        </li>
                    })}
                </ul>
                :
                <div className='empty'>
                    <h1 className='text'>
                    Dispositivos não encontrados
                    </h1>
                </div>
        }
    </div>
}

export default memo(Dashboard)
