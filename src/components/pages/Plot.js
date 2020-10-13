import React, { useState, useEffect } from 'react'
import NavBar from '../panels/NavBar'
import Menu from '../panels/Menu'
import Chart from '../panels/Chart'

import { getData } from '../../services/storage'
import fetch from '../../services/fetch'

import '../../styles/plot.css'
import '../../styles/util.css'

const Plot = ({ history }) => {
    const params = history
        .location
        .search
        .split('?')[1]
        .split('&')

    const [consumerUnitIndex, setConsumerUnitIndex] = useState(params[0])
    const [deviceIndex, setDeviceIndex] = useState(params[1])
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        (async () => {
            if(await fetch(
                getData('user')._id,
                consumerUnitIndex,
                deviceIndex
            )) {
                setSuccess(true)
                setLoading(false)
            } else {
                setSuccess(false)
                setLoading(false)
            }
        })()
    }, [consumerUnitIndex, deviceIndex])

    return <div className='plot'>
        <NavBar />
        <div className='main'>
            <Menu
                title='Unidades'
                items={
                    getData('user').consumerUnits
                }
                subItemKey='devices'
                setItemIndex={setConsumerUnitIndex}
                setSubItemIndex={setDeviceIndex}
            />
            {!loading ?
                success ?
                    <div className='chart-container'>
                        <Chart collection={getData('collection')} />
                    </div>
                    :
                    <div className='empty'>
                        <p>Não há dados deste dispositivo</p>
                    </div>
                :
                <div className='loading-container'>
                    <progress className='circular-progress'/>
                </div>
            }
        </div>

    </div>
}

export default Plot