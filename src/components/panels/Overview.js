import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import themes from '../../themes'

import {
    faThermometerThreeQuarters,
    faTint,
    faBolt,
    faEllipsisH
} from '@fortawesome/free-solid-svg-icons'

import '../../styles/overview.css'

const Overview = ({ t1, h1, v1, i1, v2, i2 }) =>
    <div className='overview'>
        {t1 !== undefined ?
            <div className='value'
                style={{
                    borderColor: themes.default.traceColors[0]
                }}
            >
                <FontAwesomeIcon
                    className='icon'
                    icon={faThermometerThreeQuarters}
                    style={{
                        color: themes.default.traceColors[0]
                    }}
                />
                <p className='text'>
                    T:
                </p>
                <p className='payload'>
                    {t1} °C
                </p>
            </div>
            : null
        }
        {h1 !== undefined ?
            <div className='value'
                style={{
                    borderColor: themes.default.traceColors[1]
                }}
            >
                <FontAwesomeIcon
                    className='icon'
                    icon={faTint}
                    style={{
                        color: themes.default.traceColors[1]
                    }}
                />
                <p className='text'>
                     HRA:
                </p>
                <p className='payload'>
                    {h1} %
                </p>
            </div>
            : null
        }
        {v1 !== undefined ?
            <div className='value'
                style={{
                    borderColor: themes.default.traceColors[2]
                }}
            >
                <FontAwesomeIcon
                    className='icon'
                    icon={faBolt}
                    style={{
                        color: themes.default.traceColors[2]
                    }}
                />
                <p className='text'>
                    Vca:
                </p>
                <p className='payload'>
                    {v1} V
                </p>
            </div>
            : null
        }
        {i1 !== undefined ?
            <div className='value'
                style={{
                    borderColor: themes.default.traceColors[3]
                }}
            >
                <FontAwesomeIcon
                    className='icon'
                    icon={faEllipsisH}
                    style={{
                        color: themes.default.traceColors[3]
                    }}
                />
                <h1 className='text'>
                    Ica:
                </h1>
                <h1 className='payload'>
                    {i1} A
                </h1>
            </div>
            : null
        }
        {v2 !== undefined ?
            <div className='value'
                style={{
                    borderColor: themes.default.traceColors[4]
                }}
            >
                <FontAwesomeIcon
                    className='icon'
                    icon={faBolt}
                    style={{
                        color: themes.default.traceColors[4]
                    }}
                />
                <p className='text'>
                            Vcc:
                </p>
                <p className='payload'>
                    {v2} V
                </p>
            </div>
            :null
        }
        {i2 !== undefined?
            <div className='value'
                style={{
                    borderColor: themes.default.traceColors[5]
                }}
            >
                <FontAwesomeIcon
                    className='icon'
                    icon={faEllipsisH}
                    style={{
                        color: themes.default.traceColors[5]
                    }}
                />
                <h1 className='text'>
                    Icc:
                </h1>
                <h1 className='payload'>
                    {i2} A
                </h1>
            </div>
            : null
        }
    </div>

export default Overview