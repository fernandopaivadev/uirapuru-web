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

const Dashboard = ({ history }) => {
    const [consumerUnitIndex, setConsumerUnitIndex] = useState(0)
    const [realTimeBuffer, setRealTimeBuffer] = useState([])
    const [newMessage, setNewMessage] = useState(false)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    let connectionTimeout = null

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

                clearTimeout(connectionTimeout)
            }
        }, [newMessage])
    )

    return <>
        <NavBar />

        <styles.main>
            <Menu
                title='Unidades'
                items={
                    storage.read('user').consumerUnits
                }
                subItemKey='devices'
                setItemIndex={setConsumerUnitIndex}
            />

            <styles.container>
                {storage.read('user')?.consumerUnits[
                    consumerUnitIndex
                ].devices.length > 0 ?
                    <styles.devices>
                        {storage.read('user')
                            ?.consumerUnits[consumerUnitIndex]
                            ?.devices.map((device, deviceIndex) =>
                                <li
                                    aria-label={`ID: ${device.id}`}
                                    key={ deviceIndex }
                                    onClick={() => {
                                        history.push(
                                        `/plot?${
                                            consumerUnitIndex
                                        }&${
                                            deviceIndex
                                        }`)
                                    }}
                                >
                                    <FaSolarPanel
                                        className='panel-icon'
                                    />
                                    <p className='text'>
                                        { device.name }
                                    </p>
                                </li>
                            )
                        }
                    </styles.devices>
                    :
                    <styles.empty>
                        <p>
                            Não há dispositivos cadastrados
                        </p>
                    </styles.empty>
                }
            </styles.container>

            {!loading ?
                success ?
                    storage.read('collection')?.length ?
                        <styles.charts>
                            <Chart
                                collection={storage.read('collection')}
                                realTime={realTimeBuffer}
                                aspectRatio={2}
                                showDots
                            />
                        </styles.charts>
                        :
                        <styles.empty>
                            <p>Não há dados destes dispositivos</p>
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
    </>
}

export default Dashboard
