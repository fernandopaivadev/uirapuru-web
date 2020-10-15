import React, { useState, useEffect } from 'react'
import NavBar from '../panels/NavBar'
import Menu from '../panels/Menu'
import Chart from '../panels/Chart'
import Export from '../panels/Export'

import { getData } from '../../services/storage'
import fetch from '../../services/fetch'

import '../../styles/plot.css'
import '../../styles/util.css'

const data = [
    ['firstname', 'lastname', 'email'],
    ['Ahmed', 'Tomi', 'ah@smthing.co.com'],
    ['Raed', 'Labes', 'rl@smthing.co.com'],
    ['Yezzi', 'Min l3b', 'ymin@cocococo.com']
]

const tempCollection = [{
    title: 'Dispositivo 1',
    timestamps: new Array(50).fill('2:00'),
    datasets: [
        {
            label: 'teste1',
            data: new Array(50).fill('5')
        }
    ]
}]

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
    // eslint-disable-next-line
    const [currentDate, setCurrentDate] = useState(
        `${
            new Date().getFullYear()
        }-${
            new Date().getMonth() < 10 ?
                '0' + new Date().getMonth()
                :
                new Date().getMonth()
        }-${
            new Date().getDate()
        }`
    )

    console.log(currentDate)
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
            <div className='content-container'>
                <div className='date-picker'>
                    <input
                        type='date'
                        defaultValue={currentDate}
                    />

                    <button className='classic-button'>
                        OK
                    </button>
                </div>
                {loading ?
                    !success ?
                        <div className='chart-container'>
                            <Chart collection={tempCollection} />
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
                <div className='buttons'>
                    <button
                        className='classic-button'
                        onClick={() => {
                            history.push('/dashboard')
                        }}
                    >
                        Voltar
                    </button>
                    {!loading ?
                        <Export data={data}/>
                        : null
                    }
                </div>
            </div>
        </div>

    </div>
}

export default Plot