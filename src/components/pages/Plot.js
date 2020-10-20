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
            new Date().getMonth() < 10 ?
                '0' + new Date().getMonth()
                :
                new Date().getMonth()
        }-${
            new Date().getDate()
        }`
    )

    const getPeriod = dateString => {
        const begin = new Date(dateString).toISOString()
        let end = new Date(dateString)
        end.setDate(end.getDate() + 1)
        end = end.toISOString()

        return [begin, end]
    }

    const getMessages = async () => {
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
        getMessages()
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
                            getMessages()
                        }}
                    >
                        OK
                    </button>
                </div>
                {!loading ?
                    success ?
                        getData('collection')?.length ?
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