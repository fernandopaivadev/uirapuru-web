import React, { useState, useEffect, useCallback } from 'react'
import NavBar from '../panels/NavBar'
import Menu from '../panels/Menu'
import Chart from '../panels/Chart'
import Overview from '../panels/Overview'

import storage from '../../services/storage'
import { websocketConfig } from '../../services/websocket'
import api from '../../services/api'

import { FaSolarPanel } from 'react-icons/fa'

import '../../styles/dashboard.css'
import '../../styles/util.css'

const Dashboard = ({ history }) => {
    const [consumerUnitIndex, setConsumerUnitIndex] = useState(0)
    const [realTimeBuffer, setRealTimeBuffer] = useState([])
    const [newMessage, setNewMessage] = useState(false)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [connected, setConnected] = useState(false)

    let connectionTimeout = null
    let overviewProps = realTimeBuffer[0]

    useEffect(() => {
        (async () => {
            setLoading(true)

            if (await api.getCollection(consumerUnitIndex) === 'OK') {
                setSuccess(true)
                setLoading(false)
            } else {
                setSuccess(false)
                setLoading(false)
            }
        })()

        websocketConfig(
            consumerUnitIndex,
            realTimeBuffer,
            setRealTimeBuffer,
            setNewMessage
        )
    }, [consumerUnitIndex])

    useEffect(
        useCallback(() => {
            if (newMessage) {
                setConnected(true)
                setNewMessage(false)

                clearTimeout(connectionTimeout)

                connectionTimeout = setTimeout(() => {
                    setConnected(false)
                }, 10000)
            }
        }, [newMessage])
    )

    return <div className='dashboard'>
        <NavBar />
        <div className='main'>
            <Menu
                title='Unidades'
                items={
                    storage.read('user').consumerUnits
                }
                subItemKey='devices'
                setItemIndex={setConsumerUnitIndex}
            />
            <div className='main-container'>
                {connected ?
                    <Overview  {...overviewProps}/>
                    : null
                }
                <ul className='devices'>
                    {storage.read('user')
                        ?.consumerUnits[ consumerUnitIndex ]
                        ?.devices.map((device, deviceIndex) =>
                            <li
                                className='device'
                                key={ deviceIndex }
                                onClick={() => {
                                    history.push(
                                        `/plot?${
                                            consumerUnitIndex
                                        }&${
                                            deviceIndex
                                        }`
                                    )
                                }}
                            >
                                <FaSolarPanel
                                    className='panelIcon'
                                />
                                <p className='text'>
                                    { device.name }
                                </p>
                            </li>
                        )
                    }
                </ul>
            </div>
            {!loading ?
                success ?
                    storage.read('collection')?.length ?
                        <div className='charts'>
                            <Chart
                                collection={storage.read('collection')}
                                realTime={realTimeBuffer}
                                aspectRatio={2}
                                showDots
                            />
                        </div>
                        :
                        <div className='empty'>
                            <p>Não há dados destes dispositivos</p>
                        </div>
                    :
                    <div className='error'>
                        <p>Não foi possível obter os dados</p>
                    </div>
                :
                <div className='loading-container'>
                    <progress className='circular-progress'/>
                </div>
            }
        </div>
    </div>
}

export default Dashboard
