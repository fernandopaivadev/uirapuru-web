import React, { useEffect, useState, useCallback, memo } from 'react'

import NavBar from '../panels/NavBar'
import Graphic from '../panels/Graphic'
import { getUser } from '../../services/storage'
import { isAuthenticated, getToken } from '../../services/auth'
import { baseURL } from '../../services/api'
import io from 'socket.io-client'

import RealTime from '../panels/RealTime'
import DeviceMenu from '../panels/DeviceMenu'

import '../../styles/dashboard.css'

let mobile = false

window.onload = () => {
    const { innerHeight, innerWidth } = window

    if (innerHeight > innerWidth || innerWidth <= 760) {
        mobile = true
    }
}

const Dashboard = () => {
    const [newMessage, setNewMessage] = useState({
        isNew: false,
        topic: '',
        payload: ''
    })

    const [buffer, setBuffer] = useState([])

    const [currentDevice, setCurrentDevice] = useState(null)
    const [deviceIndex, setDeviceIndex] = useState(null)
    const [connected, setConnected] = useState([])
    const [timeoutId, setTimeoutId] = useState([])
    const [datePicker, setDatePicker] = useState(`${
        new Date().getDate()
    }/${
        new Date().getMonth() + 1
    }/${
        new Date().getFullYear()
    }`)
    const [energyValue, setEnergyValue] = useState({
        ac: null,
        dc: null
    })
    const [devicesList, setDevicesList] = useState([])


    const webSocketConfig = useCallback(() => {
        try {
            let _devicesList = []

            getUser().consumerUnits.forEach(consumerUnit => {
                consumerUnit.devices.forEach(device => {
                    _devicesList.push(device.id)
                })
            })

            setDevicesList(_devicesList)

            const socket = io(baseURL)

            socket.emit('auth', {
                token: getToken()
            })

            socket.on('auth', ({ ok }) => {
                if (ok) {
                    socket.emit('listen', {
                        devicesList: _devicesList
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
    }, [])

    useEffect(() => {
        if (isAuthenticated()) {
            webSocketConfig()
        }
    }, [webSocketConfig])

    useEffect(() => {
        const { isNew, topic, payload } = newMessage

        if (isNew) {
            devicesList.forEach((device, index) => {
                if (device === topic) {
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
    }, [buffer, connected, devicesList, newMessage, timeoutId])

    return <div className='dashboard'>
        <NavBar />
        <DeviceMenu
            setCurrentDevice={setCurrentDevice}
            setDeviceIndex={setDeviceIndex}
        />
        <div className='main'>
            {currentDevice ?
                <div className='container'>
                    <RealTime
                        payload={buffer[deviceIndex]}
                        connected={connected[deviceIndex]}
                        energyValue={energyValue}
                        datePicker={datePicker}
                        setDatePicker={setDatePicker}
                    />
                    {!mobile ?
                        <Graphic
                            device={currentDevice}
                            setEnergyValue={setEnergyValue}
                            datePicker={datePicker}
                        />
                        : null
                    }
                </div>
                :
                <div className='empty'>
                    <h1 className='text'>
                        Escolha um dispositivo
                    </h1>
                </div>
            }
        </div>
    </div>
}

export default memo(Dashboard)
