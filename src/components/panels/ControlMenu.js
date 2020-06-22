import React from 'react'

import {
    AddToQueue as AddScreenIcon,
    RemoveFromQueue as RemoveScreenIcon
} from '@material-ui/icons'

import themes from '../../themes'
import '../../styles/controlmenu.css'

const ControlMenu = ({ display, setPeriod, setDoubleScreen, doubleScreen, values, mobile }) => (
    <div className='controls'>
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
                    <option>180 Dias</option>
                    <option>120 Dias</option>
                    <option>90 Dias</option>
                    <option>60 Dias</option>
                    <option>30 Dias</option>
                </select>
            </>
            : null
        }
        <ul>
            {display.temperature1 ?
                <li
                    style={{
                        border: `0.3rem solid ${
                            themes.default.traceColors[0]
                            }`
                    }}>
                    <h1 className='value'>
                        {display.temperature1} °C
                            </h1>
                </li>
                : null
            }
            {display.humidity1 ?
                <li
                    style={{
                        border: `0.3rem solid ${
                            themes.default.traceColors[1]
                            }`
                    }}>
                    <h1 className='value'>
                        {display.humidity1} % U.R.
                            </h1>
                </li>
                : null
            }
            {display.voltage1 ?
                <li
                    style={{
                        border: `0.3rem solid ${
                            themes.default.traceColors[2]
                            }`
                    }}>
                    <h1 className='value'>
                        {display.voltage1} V
                            </h1>
                </li>
                : null
            }
            {display.current1 ?
                <li
                    style={{
                        border: `0.3rem solid ${
                            themes.default.traceColors[3]
                            }`
                    }}>
                    <h1 className='value'>
                        {display.current} A
                            </h1>
                </li>
                : null
            }
            {display.voltage2 ?
                <li
                    style={{
                        border: `0.3rem solid ${
                            themes.default.traceColors[2]
                            }`
                    }}>
                    <h1 className='value'>
                        {display.voltage2} V
                            </h1>
                </li>
                : null
            }
            {display.current2 ?
                <li
                    style={{
                        border: `0.3rem solid ${
                            themes.default.traceColors[3]
                            }`
                    }}>
                    <h1 className='value'>
                        {display.current2} A
                            </h1>
                </li>
                : null
            }
            {display.voltage3 ?
                <li
                    style={{
                        border: `0.3rem solid ${
                            themes.default.traceColors[2]
                            }`
                    }}>
                    <h1 className='value'>
                        {display.voltage3} V
                            </h1>
                </li>
                : null
            }
            {display.current3 ?
                <li
                    style={{
                        border: `0.3rem solid ${
                            themes.default.traceColors[3]
                            }`
                    }}>
                    <h1 className='value'>
                        {display.current3} A
                            </h1>
                </li>
                : null
            }
            {display.voltage4 ?
                <li
                    style={{
                        border: `0.3rem solid ${
                            themes.default.traceColors[2]
                            }`
                    }}>
                    <h1 className='value'>
                        {display.voltage4} V
                            </h1>
                </li>
                : null
            }
            {display.current4 ?
                <li
                    style={{
                        border: `0.3rem solid ${
                            themes.default.traceColors[3]
                            }`
                    }}>
                    <h1 className='value'>
                        {display.current4} A
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
)

export default ControlMenu