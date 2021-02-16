import React, { useState, useEffect } from 'react'
import NavBar from '../../blocks/NavBar/NavBar'
import Menu from '../../blocks/Menu/Menu'
import Chart from '../../blocks/Chart/Chart'
import Export from '../../blocks/Export/Export'

import storage from '../../../services/storage'
import api from '../../../services/api'

import {
    BsCaretLeftFill as ArrowBackIcon,
    BsCaretRightFill as ArrowForwardIcon,
} from 'react-icons/bs'

import {
    BiSearchAlt as SearchIcon
} from 'react-icons/bi'

import styles from './plot.style'
import util from '../../../util/util.style'
import { themes } from '../../../util/themes.style'

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
    const [search, setSearch] = useState(true)

    const [user, setUser] = useState()
    const [csvData, setCsvData] = useState()
    const [collection, setCollection] = useState()
    const [theme, setTheme] = useState()
    const [username, setUsername] = useState()
    const [isAdmin, setIsAdmin] = useState(false)
    const [isDarkMode, setIsDarkMode] = useState()


    useEffect(() => {
        (async () => {
            setUser(await storage.read('user'))
            setCsvData(await storage.read('csv-data'))
            setCollection(await storage.read('collection'))
            setTheme(themes[await storage.read('theme') ?? 'default'])
            setUsername(await storage.read('username'))
            setIsAdmin(await storage.read('access-level') === 'admin')
            setIsDarkMode(await storage.read('theme') === 'dark')
        })()
    }, [])

    const getPeriod = dateString => {
        try {
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
        } catch (err) {
            console.log(`ERRO LOCAL: ${err.message}`)
        }
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
            try {
                if (search) {
                    setLoading(true)

                    const [begin, end] = getPeriod(currentDate)

                    if (await api.getChart(
                        consumerUnitIndex,
                        deviceIndex,
                        begin,
                        end
                    ) === 'OK') {
                        setSuccess(true)
                    } else {
                        setSuccess(false)
                    }

                    setCollection(await storage.read('collection'))
                    setCsvData(await storage.read('csv-data'))

                    setSearch(false)
                    setLoading(false)
                }
            } catch (err) {
                console.log(`ERRO LOCAL: ${err.message}`)
            }
        }
        )()
    }, [consumerUnitIndex, deviceIndex, search])

    return <>
        <NavBar
            user={user}
            username={username}
            isAdmin={isAdmin}
            theme={theme}
            isDarkMode={isDarkMode}
        />

        {user?.consumerUnits && collection ?
            <>
                <styles.main>
                    <Menu
                        className='menu'
                        title='Unidades'
                        items={
                            user.consumerUnits
                        }
                        subItemKey='devices'
                        setItemIndex={setConsumerUnitIndex}
                        setSubItemIndex={setDeviceIndex}
                    />

                    <styles.contentContainer>
                        <styles.datePicker>
                            <ArrowBackIcon
                                id='backIcon'
                                className='icon'
                                onClick={() => {
                                    changeDate('backward', currentDate)
                                }}
                            />
                            <ArrowForwardIcon
                                id='forwardIcon'
                                className='icon'
                                onClick={() => {
                                    changeDate('forward', currentDate)
                                }}
                            />

                            <input
                                id='datePicker'
                                type='date'
                                value={currentDate}
                                onChange={event => {
                                    setCurrentDate(event.target.value)
                                }}
                            />

                            <select
                                id='period'
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
                                    id='hour'
                                    type='time'
                                    defaultValue='00:00'
                                    onInput={event => {
                                        setTime(event.target.value)
                                    }}
                                />
                                : null
                            }

                            <SearchIcon
                                id='search'
                                className='icon'
                                onClick={() => {
                                    setSearch(true)
                                }}
                            />
                        </styles.datePicker>

                        {!loading ?
                            success ?
                                collection?.length ?
                                    <styles.chartContainer>
                                        <Chart
                                            collection={collection}
                                            theme={theme}
                                        />
                                    </styles.chartContainer>
                                    :
                                    <styles.empty>
                                        <p>Não há dados do dispositivo</p>
                                        <p>
                                            &quot;
                                            {user
                                                .consumerUnits[consumerUnitIndex]
                                                .devices[deviceIndex]
                                                .name
                                            }
                                            &quot;
                                        </p>
                                    </styles.empty>
                                :
                                <styles.error>
                                    <p> Não foi possível obter os dados de </p>
                                    <p>
                                        &quot;
                                        {user
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
                                id='dashboard'
                                onClick={() => {
                                    history.push('/dashboard')
                                }}
                            >
                                Dashboard
                            </util.classicButton>

                            {!loading && csvData?.length ?
                                <util.classicButton
                                    id='export'
                                >
                                    <Export
                                        data={csvData}
                                    />
                                </util.classicButton>
                                : null
                            }
                        </styles.buttons>
                    </styles.contentContainer>
                </styles.main>
            </>
            :
            <styles.loading>
                <util.circularProgress />
            </styles.loading>
        }
    </>
}

export default Plot
