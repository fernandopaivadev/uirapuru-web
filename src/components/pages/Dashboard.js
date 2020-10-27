import React, { useState, useEffect, useCallback } from 'react'
import NavBar from '../panels/NavBar'
import Menu from '../panels/Menu'
import Chart from '../panels/Chart'
import Overview from '../panels/Overview'

import { getData } from '../../services/storage'
import { websocketConfig } from '../../services/websocket'
import fetch from '../../services/fetch'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
    faSolarPanel
} from '@fortawesome/free-solid-svg-icons'

import '../../styles/dashboard.css'
import '../../styles/util.css'

const Dashboard = ({ history }) => {
    const [consumerUnitIndex, setConsumerUnitIndex] = useState(0)
    const [realTimeBuffer, setRealTimeBuffer] = useState([])
    const [newMessage, setNewMessage] = useState(false)
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState(false)

    const getPeriod = dateString => {
        let begin = new Date(dateString)
        let end = new Date(dateString)

        end.setSeconds(end.getSeconds() + 30)

        begin = begin.toISOString()
        end = end.toISOString()

        return [begin, end]
    }

    const fetchCollection = async () => {
        const [begin, end] = getPeriod(
            `${
            new Date().getFullYear()
        }-${
            new Date().getMonth() < 10 ?
                `0${new Date().getMonth() + 1}`
                :
                new Date().getMonth()
        }-${
            new Date().getDate() < 10 ?
                `0${new Date().getDate()}`
                :
                new Date().getDate()
        }`
        )

        if(await fetch(
            getData('user')._id,
            consumerUnitIndex,
            null,
            begin,
            end
        )) {
            setSuccess(true)
            setLoading(false)
        } else {
            setSuccess(false)
            setLoading(false)
        }
    }

    let overviewProps = realTimeBuffer[0]

    useEffect(() => {
            websocketConfig(
                consumerUnitIndex,
                realTimeBuffer,
                setRealTimeBuffer,
                setNewMessage
            )

            fetchCollection()
        }, [consumerUnitIndex])

    useEffect(
        useCallback(() => {
            setNewMessage(false)
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
                <Overview  {...overviewProps}/>
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
                    getData('messages')?.length ?
                        <div className='charts'>
                            <Chart
                                collection={getData('collection')}
                                realTime={realTimeBuffer}
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