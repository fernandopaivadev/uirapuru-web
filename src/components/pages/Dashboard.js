import React, { useState, useEffect, useCallback } from 'react'
import NavBar from '../panels/NavBar'
import Menu from '../panels/Menu'
import Chart from '../panels/Chart'
import Overview from '../panels/Overview'

import { getData } from '../../services/storage'
import { websocketConfig } from '../../services/websocket'
import api from '../../services/api'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faSolarPanel } from '@fortawesome/free-solid-svg-icons'

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
                    getData('user').consumerUnits
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
                    {getData('user')
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
                                <FontAwesomeIcon
                                    className='panelIcon'
                                    icon={faSolarPanel}
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
                    getData('collection')?.length ?
                        <div className='charts'>
                            <Chart
                                collection={getData('collection')}
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