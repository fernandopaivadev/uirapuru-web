import React, { useState, useEffect, useCallback } from 'react'

import NavBar from '../panels/NavBar'

import Overview from '../panels/Overview'

import { getData } from '../../services/storage'

import { websocketConfig } from '../../services/websocket'

import MenuIcon from '@material-ui/icons/Menu'

import Menu from '../panels/Menu'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faSolarPanel } from '@fortawesome/free-solid-svg-icons'

import '../../styles/mobiledashboard.css'

import '../../styles/util.css'

const MobileDashboard = ({ history }) => {
    const [consumerUnitIndex, setConsumerUnitIndex] = useState(0)
    const [realTimeBuffer, setRealTimeBuffer] = useState([])
    const [newMessage, setNewMessage] = useState(false)

    let overviewProps = realTimeBuffer[0]

    useEffect(() => {
        websocketConfig(
            consumerUnitIndex,
            realTimeBuffer,
            setRealTimeBuffer,
            setNewMessage
        )
    }, [consumerUnitIndex])

    useEffect(
        useCallback(() => {
            setNewMessage(false)
        }, [newMessage])
    )

    return <div className="mobiledashboard">
            <NavBar />
            <div className="main">
                <button className='button-menu-icon'>
                    <MenuIcon className='menu-icon' />
                </button>
                <Menu
                    className='menu'
                    title='Unidades'
                    items = {getData('user').consumerUnits}
                    setItemIndex = {setConsumerUnitIndex}
                    subItemKey='devices'
                />
                <Overview
                    className='overview'
                    {...overviewProps} />
                <ul className="devices">
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
        </div>
}

export default MobileDashboard
