import React, { useState, useEffect } from 'react'
import NavBar from '../panels/NavBar'
import Menu from '../panels/Menu'
import Chart from '../panels/Chart'
import Export from '../panels/Export'

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
    const [currentDate, setCurrentDate] = useState(
        `${
            new Date().getFullYear()
        }-${
            new Date().getMonth() + 1 < 10 ?
                `0${new Date().getMonth() + 1}`
                :
                new Date().getMonth() + 1
        }-${
            new Date().getDate() < 10 ?
                `0${new Date().getDate()}`
                :
                new Date().getDate()
        }`
    )

    const getPeriod = dateString => {
        let begin = new Date(dateString)
        let end = new Date(dateString)

        end.setMinutes(end.getMinutes() + 10)

        begin = begin.toISOString()
        end = end.toISOString()

        return [begin, end]
    }

    const fetchCollection = async () => {
        const [begin, end] = getPeriod(currentDate)

        if(await fetch(
            getData('user')._id,
            consumerUnitIndex,
            deviceIndex,
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

    useEffect(() => {
        fetchCollection()
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
                        onChange={event => {
                            setCurrentDate(event.target.value)
                        }}
                    />

                    <button
                        className='classic-button'
                        onClick ={() => {
                            fetchCollection()
                        }}
                    >
                        OK
                    </button>
                </div>
                {!loading ?
                    success ?
                        getData('messages')?.length ?
                            <div className='chart-container'>
                                <Chart collection={getData('collection')} />
                            </div>
                            :
                            <div className='empty'>
                                <p>Não há dados deste dispositivo</p>
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
                <div className='buttons'>
                    <button
                        className='classic-button'
                        onClick={() => {
                            history.push('/dashboard')
                        }}
                    >
                        Voltar
                    </button>
                    {!loading && getData('collection')?.length ?
                        <Export data={getData('messages')}/>
                        : null
                    }
                </div>
            </div>
        </div>
    </div>
}

export default Plot