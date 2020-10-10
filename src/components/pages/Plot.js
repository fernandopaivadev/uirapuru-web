import React, { useState, useEffect } from 'react'
import NavBar from '../panels/NavBar'
import Menu from '../panels/Menu'
import Chart from '../panels/Chart'

import { getData } from '../../services/storage'
import fetch from '../../services/fetch'

import '../../styles/plot.css'
import '../../styles/util.css'

const Plot = () => {
    const [consumerUnitIndex, setConsumerUnitIndex] = useState()
    const [deviceIndex, setDeviceIndex] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            if (await fetch(
                getData('user')._id,
                consumerUnitIndex,
                deviceIndex
            )) {
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
            {loading ?
                <div className='chart-container'>
                    <Chart collection={getData('collection')} />
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