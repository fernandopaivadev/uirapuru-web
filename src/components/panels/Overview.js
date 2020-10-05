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

const Overview = () =>
    <div className='overview'>
        <div className='display'>
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
                                26 °C
                </p>
            </div>
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
                            50  %
                </p>
            </div>
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
                            220 V
                </p>
            </div>
            <div className='value'
                style={{
                    borderColor: themes.default.traceColors[4]
                }}
            >
                <FontAwesomeIcon
                    className='icon'
                    icon={faEllipsisH}
                    style={{
                        color: themes.default.traceColors[4]
                    }}
                />
                <p className='text'>
                            Vcc:
                </p>
                <p className='payload'>
                                110 V
                </p>
            </div>
        </div>
    </div>

export default Overview