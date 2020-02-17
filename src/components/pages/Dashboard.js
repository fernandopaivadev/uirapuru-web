import React, {
    useEffect,
    useState,
    memo
} from 'react'

import {
    Paper,
    Typography,
    Dialog,
    DialogTitle
} from '@material-ui/core/'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThermometerThreeQuarters } from '@fortawesome/free-solid-svg-icons'
import { faTint, faBolt } from '@fortawesome/free-solid-svg-icons'

import Layout from '../layouts/Layout'
import Graphic from '../panels/Graphic'
import { isAuthenticated } from '../../services/auth'
import { baseURL } from '../../services/api'
import { getConsumerUnit } from '../../services/storage'
import io from 'socket.io-client'

import themes from '../../themes'

const styles = {
    devices: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translateX(-50%) translateY(-50%)'
    },
    empty: {
        position: 'absolute',
        textAlign: 'center',
        color: themes.default.gray,
        padding: '30px',
        fontSize: '32px',
        fontWeight: 'bold',
        top: '50%',
        left: '50%',
        transform: 'translateX(-50%) translateY(-50%)'
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        background: themes.default.white,
        padding: '20px',
        textAlign: 'center',
        minWidth: '150px',
        width: '350px',
        cursor: 'pointer',
        margin: '20px'
    },
    title: {
        fontSize: '24px',
        color: themes.default.green,
        fontWeight: 'bold'
    },
    valueIcon: {
        fontSize: '27px'
    },
    value: {
        margin: '0px 20px 0px 20px',
        fontSize: '24px',
        color: themes.default.gray,
        textAlign: 'left',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center'
    },
    cardText: {
        fontSize: '24px',
        color: themes.default.gray,
        margin: '5px'
    }
}

const Dashboard = () => {
    const [initialized, setInitialized] = useState(false)
    const [consumerUnit, setConsumerUnit] = useState({
        devices: []
    })
    const [newMessage, setNewMessage] = useState({
        isNew: false,
        topic: '',
        payload: ''
    })
    const [buffer, setBuffer] = useState([])

    const [devicePopup, setDevicePopup] = useState(false)
    const [currentDevice, setCurrentDevice] = useState(null)

    const webSocketConfig = () => {
        try {
            let devicesList = []

            consumerUnit.devices.forEach(device => {
                devicesList.push(device.id)
            })

            const socket = io(baseURL)

            socket.emit('listen', {
                devicesList
            })

            socket.on('data', ({ topic, payload }) => {
                try {
                    setNewMessage({
                        isNew: true,
                        topic,
                        payload
                    })
                }
                catch (err) {
                    console.log(err.message)
                }
            })
        }
        catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        try {
            if (isAuthenticated()) {
                setConsumerUnit(getConsumerUnit() ?? null)
                webSocketConfig()
                setInitialized(true)
            }
        }
        catch (err) {
            console.log(err.message)
        }
        // eslint-disable-next-line
    }, [initialized])

    useEffect(() => {
        const { isNew, topic, payload } = newMessage

        if (isNew) {
            consumerUnit.devices.forEach((device, index) => {
                if (device.id === topic) {
                    let _buffer = [...buffer]
                    _buffer[index] = payload

                    setNewMessage({
                        isNew: false,
                        topic: '',
                        payload: ''
                    })

                    setBuffer(_buffer)
                }
            })
        }
        // eslint-disable-next-line
    }, [newMessage])

    const Card = ({ name, value }) => {
        const { t, h, v1 } = value ?? {}

        const temperature = t
        const humidity = h
        const voltage = v1

        return (
            <Paper style={styles.paper}>
                <Typography style={styles.title}>
                    {name}
                </Typography>
                {temperature ?
                    <div style={styles.value}>
                        <FontAwesomeIcon
                            style={styles.valueIcon}
                            icon={faThermometerThreeQuarters}
                        />
                        <Typography style={styles.cardText}>
                            Temperatura:
                        </Typography>
                        {temperature} °C
                    </div>
                    : null
                }
                {humidity ?
                    <div style={styles.value}>
                        <FontAwesomeIcon
                            style={styles.valueIcon}
                            icon={faTint}
                        />
                        <Typography style={styles.cardText}>
                            Umidade:
                        </Typography>
                        {humidity} %
                    </div>
                    : null
                }
                {voltage ?
                    <div style={styles.value}>
                        <FontAwesomeIcon
                            style={styles.valueIcon}
                            icon={faBolt}
                        />
                        <Typography style={styles.cardText}>
                            Tensão:
                        </Typography>
                        {voltage} V
                    </div>
                    : null
                }
                {!value ?
                    <Typography style={styles.cardText}>
                        Desconectado
                    </Typography>
                    : null
                }
            </Paper>
        )
    }

    return <div>
        <Layout />
        {(consumerUnit?.devices?.length > 0) ?
            <ul style={styles.devices}>
                {consumerUnit.devices.map((device, index) => {
                    const value = JSON.parse(buffer[index] ?? null)

                    return (
                        <li
                            key={index}
                            onClick={() => {
                                setDevicePopup(true)
                                setCurrentDevice(device)
                            }}
                        >
                            <Card
                                name={device.name}
                                value={value}
                            />
                        </li>
                    )
                })}
            </ul>
            :
            <Paper style={styles.empty}>
                Dispositivos não encontrados
            </Paper>
        }
        {devicePopup ?
            <Dialog
                open={devicePopup}
                onClose={() => {
                    setDevicePopup(false)
                    setCurrentDevice(null)
                }}
                scroll='paper'
                fullScreen
            >
                <DialogTitle
                    style={{
                        textAlign: 'center',
                        alignItems: 'top'
                    }} >
                    <Typography style={styles.title}>
                        {currentDevice.name}
                    </Typography>
                </DialogTitle>
                <div
                    style={{
                        padding: '0px 30px 30px 30px'
                    }}
                >
                    <Graphic device={currentDevice} setDevicePopup={setDevicePopup} />
                </div>
            </Dialog>
            : null
        }
    </div>
}

export default memo(Dashboard)
