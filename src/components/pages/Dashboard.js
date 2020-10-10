import React, { useState, useEffect } from 'react'
import NavBar from '../panels/NavBar'
import Menu from '../panels/Menu'
import Chart from '../panels/Chart'
import Overview from '../panels/Overview'

import { getData } from '../../services/storage'
import { realTimeConfig, realTimeBuffer } from '../../services/websocket'
import fetch from '../../services/fetch'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
    faSolarPanel
} from '@fortawesome/free-solid-svg-icons'

import '../../styles/dashboard.css'
import '../../styles/util.css'

const overviewProps = {
    t1: '42.9',
    h1: '98',
    v1: '231',
    i1: '9',
    v2: '127',
    i2: '5'
}

const Dashboard = ({ history }) => {
    const [consumerUnitIndex, setConsumerUnitIndex] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            realTimeConfig(consumerUnitIndex)
            if (await fetch(
                getData('user')._id,
                consumerUnitIndex
            )) {
                setLoading(false)
            }
        })()
    }, [consumerUnitIndex])

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
                        ?.devices.map((device, index) =>
                            <li
                                className='device'
                                key={ index }
                                onClick={() => {
                                    history.push(`/plot?id=${device.id}`)
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
                <div className='charts'>
                    <Chart
                        collection={getData('collection')}
                        realTime={realTimeBuffer}
                    />
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