import React, { useEffect, useState, memo } from 'react'

import { api } from '../../services/api'

import Plot from './Plot'

import {
    Close as CloseIcon,
    AddToQueue as AddScreenIcon,
    RemoveFromQueue as RemoveScreenIcon
} from '@material-ui/icons'

import themes from '../../themes'

import '../../styles/graphic.css'
import '../../styles/util.css'

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

            const status = response?.status

            if (status === 200) {
                const messages = response?.data?.messages

                if (messages.length > 0) {
                    let _values = []
                    let _timestamps = []

                    messages.forEach(message => {
                        _values.push(JSON.parse(message.payload))
                        _timestamps.push(message.timestamp)
                    })

                    setValues(_values)
                    setTimestamps(_timestamps)
                }

                setLoading(false)
            }
        } catch (err) {
            console.log(err?.message ?? err?.response?.data?.message)
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

    return <div className='graphic'>
        {loading ?
            <div className='loading-container'>
                <progress className='pure-material-progress-circular'/>
            </div>
            :
            values.length > 0 ?
                doubleScreen ?
                    <>
                        <Plot {...plotProps} />
                        <Plot {...plotProps} />
                    </>
                    :
                    <Plot {...plotProps} />
                :
                <div className='empty'>
                    <h1 className='text'>
                        Não há dados registrados
                    </h1>
                </div>
        }

        {!loading ?
            <div className='controls'>
                <button
                    onClick={() => {
                        setDevicePopup(false)
                    }}
                    className='close'>
                    <CloseIcon className='icon'/>
                </button>

                {values.length > 0 ?
                    <>
                        <button
                            onClick={() => {
                                setDoubleScreen(!doubleScreen)
                            }}
                            className='button'>
                            {doubleScreen ?
                                <RemoveScreenIcon className='icon' />
                                :
                                <AddScreenIcon className='icon' />
                            }
                        </button>

                        <select
                            onChange={event => {
                                setPeriod(event.target.options.selectedIndex)
                            }}>
                            <option>10 Dias</option>
                            <option>30 Dias</option>
                            <option>60 Dias</option>
                            <option>90 Dias</option>
                        </select>
                    </>
                    : null
                }
                <ul>
                    {display.temperature ?
                        <li
                            style={{
                                border: `0.3rem solid ${
                                    themes.default.traceColors[0]
                                }`
                            }}>
                            <h1 className='value'>
                                {display.temperature} °C
                            </h1>
                        </li>
                        : null
                    }
                    {display.humidity ?
                        <li
                            style={{
                                border: `0.3rem solid ${
                                    themes.default.traceColors[1]
                                }`
                            }}>
                            <h1 className='value'>
                                {display.humidity} % U.R.
                            </h1>
                        </li>
                        : null
                    }
                    {display.voltage ?
                        <li
                            style={{
                                border: `0.3rem solid ${
                                    themes.default.traceColors[2]
                                }`
                            }}>
                            <h1 className='value'>
                                {display.voltage} V
                            </h1>
                        </li>
                        : null
                    }
                    {display.voltageLevel ?
                        <li
                            style={{
                                border: `0.3rem solid ${
                                    themes.default.traceColors[3]
                                }`
                            }}>
                            <h1 className='value'>
                                {display.voltageLevel} % V Max
                            </h1>
                        </li>
                        : null
                    }
                    {display.time ?
                        <li>
                            <h1 className='time'>
                                {display.time}
                            </h1>
                        </li>
                        : null
                    }
                </ul>
            </div>
            : null
        }
    </div>
}

export default memo(Graphic)
