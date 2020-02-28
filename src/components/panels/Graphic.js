import React, { useEffect, useState, memo } from 'react'

import { api } from '../../services/api'

import Plot from './Plot'

import {
    Typography,
    IconButton,
    CircularProgress,
    Tooltip
} from '@material-ui/core'

import {
    Close as CloseIcon,
    AddToQueue as AddScreenIcon,
    RemoveFromQueue as RemoveScreenIcon
} from '@material-ui/icons'

import themes from '../../themes'

const styles = {
    option: {
        font: `14px ${themes.default.black}`,
        fontWeight: '600'
    },
    select: {
        width: '100px',
        height: '50px',
        padding: '10px',
        margin: '10px auto 10px auto',
        borderRadius: '5px',
        border: `1px ${themes.default.green} solid`,
        font: `14px ${themes.default.green}`,
        fontWeight: '600'
    },
    main: {
        display: 'flex',
        position: 'relative'
    },
    controlBtn: {
        width: '45px',
        height: '45px',
        background: themes.default.green,
        color: themes.default.white,
        margin: '10px auto 10px auto'
    },
    controls: {
        position: 'absolute',
        top: '0',
        right: '0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    display: {
        color: themes.default.black,
        fontSize: '18px',
        fontWeight: '600',
        margin: '10px auto 10px auto',
        padding: '5px 10px 5px 10px',
        borderRadius: '5px',
        border: `3px ${themes.default.green} solid`
    },
    time: {
        color: themes.default.black,
        fontSize: '14px',
        fontWeight: '600',
        margin: '15px auto 15px auto',
        padding: '10px',
        borderRadius: '5px',
        border: `1px ${themes.default.green} solid`
    },
    loadingContainer: {
        width: '100vw',
        height: '90vh',
        margin: 'auto'
    },
    loading: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    loadingIcon: {
        color: themes.default.green
    }
}

const Graphic = ({ device, setDevicePopup }) => {
    const [display, setDisplay] = useState({})
    const [loading, setLoading] = useState(false)
    const [doubleScreen, setDoubleScreen] = useState(false)
    const [values, setValues] = useState([])
    const [timestamps, setTimestamps] = useState([])
    const [period, setPeriod] = useState(null)

    const getMessages = async () => {
        try {
            const now = new Date()
            let before = new Date()

            switch (period) {
                case 0:
                    before.setDate(before.getDate() - 10)
                    break
                case 1:
                    before.setDate(before.getDate() - 30)
                    break
                case 2:
                    before.setDate(before.getDate() - 60)
                    break
                case 3:
                    before.setDate(before.getDate() - 90)
                    break
                default:
                    before.setDate(before.getDate() - 10)
                    break
            }

            setLoading(true)

            const response = await api.get(
                `/device/messages?device=${
                device.id
                }&from=${before.toISOString()}&to=${now.toISOString()}`
            )

            const { status } = response

            if (status === 200) {
                const { messages } = response.data

                let _values = []
                let _timestamps = []

                messages.forEach(message => {
                    _values.push(JSON.parse(message.payload))
                    _timestamps.push(message.timestamp)
                })

                setValues(_values)
                setTimestamps(_timestamps)
                setLoading(false)
            }
        } catch (err) {
            try {
                console.log(err.response.data.message)
            } catch (err) {
                console.log(err.message)
            }
        }
    }

    useEffect(() => {
        getMessages()
        // eslint-disable-next-line
    }, [period])

    const plotProps = {
        values,
        timestamps,
        setDisplay,
        doubleScreen
    }

    return (
        <div style={styles.main}>
            {loading ? (
                <div style={styles.loadingContainer}>
                    <div style={styles.loading}>
                        <CircularProgress style={styles.loadingIcon} />
                    </div>
                </div>
            ) : doubleScreen ? (
                <>
                    <Plot {...plotProps} />
                    <Plot {...plotProps} />
                </>
            ) : (
                        <Plot {...plotProps} />
                    )}

            <div style={styles.controls}>
                <Tooltip title="Fechar">
                    <IconButton
                        component="span"
                        onClick={() => {
                            setDevicePopup(false)
                        }}
                        style={styles.controlBtn}
                    >
                        <CloseIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Dividir tela">
                    <IconButton
                        component="span"
                        onClick={() => {
                            setDoubleScreen(!doubleScreen)
                        }}
                        style={styles.controlBtn}
                    >
                        {doubleScreen ? (
                            <RemoveScreenIcon />
                        ) : (
                                <AddScreenIcon />
                            )}
                    </IconButton>
                </Tooltip>

                <select
                    style={styles.select}
                    onChange={event => {
                        setPeriod(event.target.options.selectedIndex)
                    }}
                >
                    <option style={styles.option}>10 Dias</option>
                    <option style={styles.option}>30 Dias</option>
                    <option style={styles.option}>60 Dias</option>
                    <option style={styles.option}>90 Dias</option>
                </select>
                <ul>
                    {display.temperature ? (
                        <li>
                            <Typography
                                style={{
                                    ...styles.display,
                                    borderColor: themes.default.traceColors[0]
                                }}
                            >
                                {display.temperature} °C
                            </Typography>
                        </li>
                    ) : null}
                    {display.humidity ? (
                        <li>
                            <Typography
                                style={{
                                    ...styles.display,
                                    borderColor: themes.default.traceColors[1]
                                }}
                            >
                                {display.humidity} % U.R.
                            </Typography>
                        </li>
                    ) : null}
                    {display.voltage ? (
                        <li>
                            <Typography
                                style={{
                                    ...styles.display,
                                    borderColor: themes.default.traceColors[2]
                                }}
                            >
                                {display.voltage} V
                            </Typography>
                        </li>
                    ) : null}
                    {display.voltageLevel ? (
                        <li>
                            <Typography
                                style={{
                                    ...styles.display,
                                    borderColor: themes.default.traceColors[3]
                                }}
                            >
                                {display.voltageLevel} % V Max
                            </Typography>
                        </li>
                    ) : null}
                    {display.time ? (
                        <li>
                            <Typography style={styles.time}>
                                {display.time}
                            </Typography>
                        </li>
                    ) : null}
                </ul>
            </div>
        </div>
    )
}

export default memo(Graphic)
