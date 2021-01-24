import React, { useState, useEffect, useCallback } from 'react'

import NavBar from '../blocks/NavBar'
import Menu from '../blocks/Menu'
import Chart from '../blocks/Chart'

import storage from '../../services/storage'
import websocket from '../../services/websocket'
import api from '../../services/api'

import { FaSolarPanel } from 'react-icons/fa'

import styles from '../../styles/dashboard'
import util from '../../styles/util'
import { themes } from '../../styles/themes'

const Dashboard = ({ history }) => {
    const [consumerUnitIndex, setConsumerUnitIndex] = useState(0)
    const [realTimeBuffer, setRealTimeBuffer] = useState([])
    const [newMessage, setNewMessage] = useState(false)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const isAdmin = storage.read('access-level') === 'admin'

    const theme = themes[storage.read('theme') ?? 'default']
    const { traceColors } = theme

    useEffect(() => {
        (async () => {
            setLoading(true)

            if (await api.getCollection(consumerUnitIndex) === 'OK') {
                setSuccess(true)
                setLoading(false)
            } else {
                setSuccess(false)
                setLoading(false)
            }
        })()

        websocket.config(
            consumerUnitIndex,
            realTimeBuffer,
            setRealTimeBuffer,
            setNewMessage
        )
    }, [consumerUnitIndex])

    useEffect(
        useCallback(() => {
            if (newMessage) {
                setNewMessage(false)
            }
        }, [newMessage])
    )

    const keyToUnity = key => {
        switch (key) {
        case 'T':
            return ' °C'
        case 'U.R.':
            return ' %'
        case 'Vac':
            return ' V'
        case 'Vcc':
            return ' V'
        case 'Iac':
            return ' A'
        case 'Icc':
            return ' A'
        case 'Pac':
            return ' W'
        case 'Pcc':
            return ' W'
        default:
            return ''
        }
    }

    return <>
        <NavBar />

        {storage.read('user').consumerUnits.length > 0 ?
            <styles.main>
                <Menu
                    title='Unidades'
                    items={
                        storage.read('user').consumerUnits
                    }
                    subItemKey='devices'
                    setItemIndex={setConsumerUnitIndex}
                    setSubItemIndex={(deviceIndex) => {
                        history.push(
                        `/plot?consumerUnitIndex=${
                            consumerUnitIndex
                        }&deviceIndex=${
                            deviceIndex
                        }`)
                    }}
                />

                <styles.container>
                    {storage.read('user')?.consumerUnits[
                        consumerUnitIndex
                    ].devices.length > 0 ?
                        <styles.devices>
                            {storage.read('user')
                                ?.consumerUnits[consumerUnitIndex]
                                ?.devices.map((device, deviceIndex) =>
                                    <styles.deviceIcon
                                        id={`deviceIcon${deviceIndex}`}
                                        aria-label={`ID: ${device.id}`}
                                        key={deviceIndex}
                                        onClick={() => {
                                            history.push(
                                        `/plot?consumerUnitIndex=${
                                            consumerUnitIndex
                                        }&deviceIndex=${
                                            deviceIndex
                                        }`)
                                        }}
                                    >
                                        <FaSolarPanel
                                            className='panel-icon'
                                        />
                                        <p className='device-name'>
                                            {device.name}
                                        </p>

                                        <ul className='real-time'>
                                            {Object.keys(
                                                realTimeBuffer[deviceIndex] ?? {}
                                            ).map((key, keyIndex) =>
                                                <li key={keyIndex}>
                                                    <p style={{
                                                        color: traceColors[keyIndex]
                                                    }}>
                                                        {key}:
                                                        {realTimeBuffer[
                                                            deviceIndex
                                                        ][key] ?? null}
                                                        {keyToUnity(key)}
                                                    </p>
                                                </li>
                                            )}
                                        </ul>
                                    </styles.deviceIcon>
                                )
                            }
                        </styles.devices>
                        :
                        <styles.empty>
                            <p>
                                Não há dispositivos cadastrados
                            </p>

                            {isAdmin ?
                                <util.classicButton
                                    onClick={() => {
                                        history.push('/profile')
                                    }}
                                >
                                Cadastrar dispositivo
                                </util.classicButton>
                                : null
                            }
                        </styles.empty>
                    }
                </styles.container>

                {!loading ?
                    success ?
                        storage.read('collection')?.length ?
                            <styles.charts>
                                <Chart
                                    collection={storage.read('collection')}
                                    aspectRatio={2}
                                />
                            </styles.charts>
                            :
                            <styles.empty>
                                <p>
                                    Não há dados registrados
                                    nas últimas 24 horas
                                </p>
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

            </styles.main>
            :
            <styles.noUnit
                id='noUnit'
            >
                {isAdmin ?
                    <>
                        <p>
                            Cadastre uma unidade consumidora
                        </p>
                        <util.classicButton
                            id='newUnit'
                            onClick={() => {
                                history.push('/new-unit')
                            }}
                        >
                            Nova Unidade
                        </util.classicButton>
                    </>
                    :
                    <p>
                        Não há unidade consumidora cadastrada
                    </p>
                }
            </styles.noUnit>
        }
    </>
}

export default Dashboard
