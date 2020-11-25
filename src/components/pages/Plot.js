import React, { useState, useEffect } from 'react'
import NavBar from '../blocks/NavBar'
import Menu from '../blocks/Menu'
import Chart from '../blocks/Chart'
import Export from '../blocks/Export'

import storage from '../../services/storage'
import api from '../../services/api'

import {
    MdKeyboardArrowLeft as ArrowBackIcon,
    MdKeyboardArrowRight as ArrowForwardIcon
} from 'react-icons/md'

import '../../styles/plot.css'
import '../../styles/util.css'

const mobile = window.innerHeight > window.innerWidth

window.onorientationchange = () => {
    window.location.reload()
}

const Plot = ({ history }) => {
    const params = history
        .location
        .search
        .split('?')[1]
        .split('&')

    const [consumerUnitIndex, setConsumerUnitIndex] = useState(Number(params[0]))
    const [deviceIndex, setDeviceIndex] = useState(Number(params[1]))
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

        end.setDate(end.getDate() + 1)

        begin = begin.toISOString()
        end = end.toISOString()

        return [begin, end]
    }

    const changeDate = (change, dateString) => {
        const date = new Date(dateString)

        if (change === 'forward') {
            date.setDate(date.getDate() + 1)
        } else if (change === 'backward') {
            date.setDate(date.getDate() - 1)
        }

        const newDateString = date.toISOString().split('T')[0]
        setCurrentDate(newDateString)
    }

    useEffect(() => {
        (async () => {
            setLoading(true)

            const [begin, end] = getPeriod(currentDate)

            if (await api.getChart(
                consumerUnitIndex,
                deviceIndex,
                begin,
                end
            ) === 'OK') {
                setSuccess(true)
                setLoading(false)
            } else {
                setSuccess(false)
                setLoading(false)
            }
        })()
    }, [consumerUnitIndex, deviceIndex, currentDate])

    return <div className='plot'>
        <NavBar />
        <div className='main'>
            <Menu
                className='menu'
                title='Unidades'
                items={
                    storage.read('user').consumerUnits
                }
                subItemKey='devices'
                setItemIndex={setConsumerUnitIndex}
                setSubItemIndex={setDeviceIndex}
            />
            <div className='content-container'>
                <div className='date-picker'>
                    <ArrowBackIcon
                        className='icon'
                        onClick={() => {
                            changeDate('backward', currentDate)
                        }}
                    />
                    <ArrowForwardIcon
                        className='icon'
                        onClick={() => {
                            changeDate('forward', currentDate)
                        }}
                    />

                    <input
                        type='date'
                        value={currentDate}
                        onChange={event => {
                            setCurrentDate(event.target.value)
                        }}
                    />
                </div>
                {!loading ?
                    success ?
                        storage.read('collection')?.length ?
                            <div className='chart-container'>
                                <Chart
                                    collection={storage.read('collection')}
                                    aspectRatio={
                                        mobile ? 1.5 : null
                                    }
                                    showDots
                                />
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
                        Dashboard
                    </button>
                    {!loading && storage.read('messages')?.length ?
                        <Export data={storage.read('messages')}/>
                        : null
                    }
                </div>
            </div>
        </div>
    </div>
}

export default Plot
