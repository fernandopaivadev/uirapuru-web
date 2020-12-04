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

import styles from '../../styles/plot'
import util from '../../styles/util'

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
                </styles.datePicker>
                {!loading ?
                    success ?
                        storage.read('collection')?.length ?
                            <styles.chartContainer>
                                <Chart
                                    collection={storage.read('collection')}
                                    showDots
                                />
                            </styles.chartContainer>
                            :
                            <styles.empty>
                                <p>Não há dados deste dispositivo</p>
                            </styles.empty>
                        :
                        <styles.error>
                            <p>Não foi possível obter os dados</p>
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
                    {!loading && storage.read('messages')?.length ?
                        <Export data={storage.read('messages')}/>
                        : null
                    }
                </styles.buttons>
            </styles.contentContainer>
        </styles.main>
    </>
}

export default Plot
