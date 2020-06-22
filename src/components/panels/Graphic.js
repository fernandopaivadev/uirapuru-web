import React, { useEffect, useState, memo } from 'react'

import { api } from '../../services/api'

import Plot from './Plot'

<<<<<<< HEAD
import '../../styles/graphic.css'
import '../../styles/util.css'
import ControlMenu from './ControlMenu'
=======
import {
    Close as CloseIcon,
    AddToQueue as AddScreenIcon,
    RemoveFromQueue as RemoveScreenIcon
} from '@material-ui/icons'

import themes from '../../themes'

import '../../styles/graphic.css'
import '../../styles/util.css'

<<<<<<< HEAD
>>>>>>> 1117c4f3f0e8118264dfebe75ced234abcf5108f
=======
<<<<<<< HEAD
=======
>>>>>>> 1117c4f3f0e8118264dfebe75ced234abcf5108f
>>>>>>> master
>>>>>>> ad70c575d6f1c1a19740f21ad176edc1f89b4629

let mobile = false

window.onload = () => {
    const { innerHeight, innerWidth } = window

    if (innerHeight > innerWidth) {
        mobile = true
    }
}

<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
<<<<<<< HEAD
>>>>>>> ad70c575d6f1c1a19740f21ad176edc1f89b4629
const Graphic = ({ device }) => {
    const [display, setDisplay] = useState({})
    const [loading, setLoading] = useState(false)
    const [values, setValues] = useState([])
    const [timestamps, setTimestamps] = useState([])
    const [period, setPeriod] = useState()
=======
<<<<<<< HEAD
=======
>>>>>>> master
>>>>>>> ad70c575d6f1c1a19740f21ad176edc1f89b4629
const Graphic = ({ device, setDevicePopup }) => {
    const [display, setDisplay] = useState({})
    const [loading, setLoading] = useState(false)
    const [doubleScreen, setDoubleScreen] = useState(false)
    const [values, setValues] = useState([])
    const [timestamps, setTimestamps] = useState([])
    const [period, setPeriod] = useState(null)
>>>>>>> 1117c4f3f0e8118264dfebe75ced234abcf5108f

    const getMessages = async () => {
        try {
            const now = new Date()
            let before = new Date()

            switch (period) {
<<<<<<< HEAD
                case 4:
                    before.setDate(before.getDate() - 30)
                    break
                case 3:
                    before.setDate(before.getDate() - 60)
                    break
                case 2:
                    before.setDate(before.getDate() - 90)
                    break
                case 1:
                    before.setDate(before.getDate() - 120)
                    break
                case 0:
                    before.setDate(before.getDate() - 180)
                    break
                default:
                    before.setDate(before.getDate() - 180)
                    break
=======
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
>>>>>>> 1117c4f3f0e8118264dfebe75ced234abcf5108f
            }

            setLoading(true)

            const response = await api.get(
                `/device/messages?device=${
<<<<<<< HEAD
                device.id
=======
                    device.id
>>>>>>> 1117c4f3f0e8118264dfebe75ced234abcf5108f
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
<<<<<<< HEAD
                    console.log(values)
=======
>>>>>>> 1117c4f3f0e8118264dfebe75ced234abcf5108f
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
<<<<<<< HEAD
    }, [period, device])
=======
    }, [period])
>>>>>>> 1117c4f3f0e8118264dfebe75ced234abcf5108f

    const plotProps = {
        values,
        timestamps,
        setDisplay,
<<<<<<< HEAD
<<<<<<< HEAD
=======
        doubleScreen,
=======
<<<<<<< HEAD
>>>>>>> ad70c575d6f1c1a19740f21ad176edc1f89b4629
        mobile
    }

    const controlMenuProps = {
        display,
        setPeriod,
        values,
=======
        doubleScreen,
>>>>>>> 1117c4f3f0e8118264dfebe75ced234abcf5108f
<<<<<<< HEAD
=======
>>>>>>> master
>>>>>>> ad70c575d6f1c1a19740f21ad176edc1f89b4629
        mobile
    }

    return <div className='graphic'>
        {loading ?
            <div className='loading-container'>
<<<<<<< HEAD
                <progress className='pure-material-progress-circular' />
            </div>
            :
            values.length > 0 ?
                <Plot {...plotProps} />
=======
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
>>>>>>> 1117c4f3f0e8118264dfebe75ced234abcf5108f
                :
                <div className='empty'>
                    <h1 className='text'>
                        Não há dados registrados
                    </h1>
                </div>
        }

        {!loading ?
<<<<<<< HEAD
            <ControlMenu
                {...controlMenuProps}
            />
=======
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
                        {!mobile ?
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
                            :
                            null
                        }
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
                                {display.voltageLevel} % V
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
>>>>>>> 1117c4f3f0e8118264dfebe75ced234abcf5108f
            : null
        }
    </div>
}

export default memo(Graphic)
