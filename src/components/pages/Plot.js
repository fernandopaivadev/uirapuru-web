import React, { useState, useEffect } from 'react'
import NavBar from '../blocks/NavBar'
import Menu from '../blocks/Menu'
import Chart from '../blocks/Chart'
import Export from '../blocks/Export'

import storage from '../../services/storage'
import api from '../../services/api'

import {
    BsCaretLeftFill as ArrowBackIcon,
    BsCaretRightFill as ArrowForwardIcon
} from 'react-icons/bs'

import styles from '../../styles/plot'
import util from '../../styles/util'

const Plot = ({ history }) => {
    const params = history
        .location
        .search
        .split('?')[1]
        .split('&')

    const [consumerUnitIndex, setConsumerUnitIndex] = useState(
        params[0].split('consumerUnitIndex=')[1]
    )
    const [deviceIndex, setDeviceIndex] = useState(
        params[1].split('deviceIndex=')[1]
    )
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
    const [time, setTime] = useState('00:00')
    const [period, setPeriod] = useState('24h')

    const getPeriod = dateString => {
        const begin = new Date(dateString)
        const end = new Date(dateString)
        let increment = 1

        switch (period) {
        case '24h':
            increment = 24
            break
        case '12h':
            increment = 12
            break
        case '6h':
            increment = 6
            break
        case '1h':
            increment = 1
            break
        default:
            increment = 24
        }

        begin.setHours(time.split(':')[0])
        end.setHours(time.split(':')[0] + increment)

        return [begin.toISOString(), end.toISOString()]
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
    }, [consumerUnitIndex, deviceIndex, currentDate, time, period])

    return <>
        <NavBar />

        <styles.main>
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

            <styles.contentContainer>
                <styles.datePicker>
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

                    <select
                        onInput={event => {
                            setPeriod(event.target.value)
                        }}
                    >
                        <option value='24h'>24 horas</option>
                        <option value='12h'>12 horas</option>
                        <option value='6h'>6 horas</option>
                        <option value='1h'>1 hora</option>
                    </select>

                    {!(period === '24h') ?
                        <input
                            type='time'
                            defaultValue='00:00'
                            onInput={event => {
                                setTime(event.target.value)
                            }}
                        />
                        : null
                    }
                </styles.datePicker>

                {!loading ?
                    success ?
                        storage.read('collection')?.length ?
                            <styles.chartContainer>
                                <Chart
                                    collection={storage.read('collection')}
                                />
                            </styles.chartContainer>
                            :
                            <styles.empty>
                                <p>Não há dados do dispositivo</p>
                                <p>
                                    &quot;
                                    {storage.read('user')
                                        .consumerUnits[consumerUnitIndex]
                                        .devices[deviceIndex]
                                        .name
                                    }
                                    &quot;
                                </p>
                            </styles.empty>
                        :
                        <styles.error>
                            <p>Não foi possível obter os dados de</p>
                            <p>
                                &quot;
                                {storage.read('user')
                                    .consumerUnits[consumerUnitIndex]
                                    .devices[deviceIndex]
                                    .name
                                }
                                &quot;
                            </p>
                        </styles.error>
                    :
                    <styles.loading>
                        <util.circularProgress/>
                    </styles.loading>
                }
                <styles.buttons>
                    <util.classicButton
                        onClick={() => {
                            history.push('/dashboard')
                        }}
                    >
                        Dashboard
                    </util.classicButton>
                    {!loading && storage.read('csv-data')?.length ?
                        <Export data={storage.read('csv-data')}/>
                        : null
                    }
                </styles.buttons>
            </styles.contentContainer>
        </styles.main>
    </>
}

export default Plot
