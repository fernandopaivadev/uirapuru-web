import React, { useEffect, useState, memo } from 'react'

<<<<<<< HEAD
import NavBar from '../panels/NavBar'
=======
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faThermometerThreeQuarters,
    faTint,
    faBolt
} from '@fortawesome/free-solid-svg-icons'

import Layout from '../layouts/Layout'
>>>>>>> 1117c4f3f0e8118264dfebe75ced234abcf5108f
import Graphic from '../panels/Graphic'
import { isAuthenticated, getToken } from '../../services/auth'
import { baseURL } from '../../services/api'
import { getConsumerUnit } from '../../services/storage'
import io from 'socket.io-client'

<<<<<<< HEAD
import RealTime from '../panels/RealTime'
import DeviceMenu from '../panels/DeviceMenu'

import '../../styles/dashboard.css'
=======
import '../../styles/dashboard.css'
import themes from '../../themes'
>>>>>>> 1117c4f3f0e8118264dfebe75ced234abcf5108f

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

<<<<<<< HEAD
    const [currentDevice, setCurrentDevice] = useState(null)
    const [index, setIndex] = useState(null)
=======
    const [devicePopup, setDevicePopup] = useState(false)
    const [currentDevice, setCurrentDevice] = useState(null)
>>>>>>> 1117c4f3f0e8118264dfebe75ced234abcf5108f

    const [connected, setConnected] = useState([])
    const [timeoutId, setTimeoutId] = useState([])

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
<<<<<<< HEAD
                setInitialized(true)
                setConsumerUnit(getConsumerUnit() ?? null)
                webSocketConfig()
=======
                setConsumerUnit(getConsumerUnit() ?? null)
                webSocketConfig()
                setInitialized(true)
>>>>>>> 1117c4f3f0e8118264dfebe75ced234abcf5108f
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

                    let _connected = [...connected]
                    _connected[index] = true
                    setConnected(_connected)

                    clearTimeout(timeoutId[index])

                    let _timeoutId = [...timeoutId]
                    _timeoutId[index] = setTimeout(() => {
                        let _connected = [...connected]
                        _connected[index] = false
                        setConnected(_connected)
                    }, 10000)
                    setTimeoutId(_timeoutId)
                }
            })
        }
        // eslint-disable-next-line
    }, [newMessage])

<<<<<<< HEAD
    return <div className='dashboard'>
        <NavBar />
        <DeviceMenu
            devices={consumerUnit?.devices}
            setCurrentDevice={setCurrentDevice}
            setIndex={setIndex}
        />
        <div className='main'>
            {currentDevice ?
                <div className='container'>
                    <RealTime
                        value={buffer[index]}
                        connected={connected[index]}
                    />
                    <Graphic
                        device={currentDevice}
                    />
                </div>
                :
                <div className='empty'>
                    <h1 className='text'>
                        Escolha um dispositivo
                    </h1>
                </div>
            }
        </div>
=======
    const Card = ({ name, id, index, value }) => {
        if (!connected[index]) {
            value = null
        }

        //const { t, h, v1 } = value ?? {}
        const { t, v1 } = value ?? {}

        const temperature = t
        //const humidity = h
        const humidity = null
        const voltage = v1

        return <div className='card'>
            <h1 className='title'>{name}</h1>
            <h1 className='subtitle'>{id}</h1>

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
            {!connected[index] ?
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
                            <Card
                                name={device.name}
                                id={device.id}
                                index={index}
                                value={value}
                            />
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
>>>>>>> 1117c4f3f0e8118264dfebe75ced234abcf5108f
    </div>
}

export default memo(Dashboard)
