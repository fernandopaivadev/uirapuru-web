import React, { useState, useEffect } from 'react'
import NavBar from '../panels/NavBar'
import Menu from '../panels/Menu'
import Chart from '../panels/Chart'
import Export from '../panels/Export'

import { getData } from '../../services/storage'
import fetch from '../../services/fetch'

import {
    ArrowLeft as ArrowBackIcon,
    ArrowRight as ArrowForwardIcon
} from '@material-ui/icons'

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
        const dateSplit = dateString.split('-')

        if (change === 'forward') {
            dateSplit[2] = String(Number(dateSplit[2]) + 1)
        } else if (change === 'backward') {
            dateSplit[2] = String(Number(dateSplit[2]) - 1)
        }

        dateString = dateSplit.join('-')
        setCurrentDate(dateString)
    }

    useEffect(() => {
        (async () => {
            setLoading(true)

            const [begin, end] = getPeriod(currentDate)

            if (await fetch.deviceData(
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
        })()
    }, [consumerUnitIndex, deviceIndex, currentDate])

    return <div className='plot'>
        <NavBar />
        <div className='main'>
            <Menu
                className='menu'
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
                        defaultValue={currentDate}
                        value={currentDate}
                        onChange={event => {
                            setCurrentDate(event.target.value)
                        }}
                    />
                </div>
                {!loading ?
                    success ?
                        getData('messages')?.length ?
                            <div className='chart-container'>
                                <Chart
                                    collection={getData('collection')}
                                    aspectRatio={
                                        mobile ? 1.5 : null
                                    }
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
                    {!loading && getData('messages')?.length ?
                        <Export data={getData('messages')}/>
                        : null
                    }
                </div>
            </div>
        </div>
    </div>
}

export default Plot