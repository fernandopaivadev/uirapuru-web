import React from 'react'

import { themes } from '../../styles/themes'

import {
    FaThermometerThreeQuarters,
    FaTint,
    FaBolt,
    FaEllipsisH
} from 'react-icons/fa'

import styles from '../../styles/overview'

const Overview = ({ t1, h1, v1, i1, v2, i2 }) =>
    <styles.main>
        {t1 !== undefined ?
            <styles.value
                style={{
                    borderColor: themes.default.traceColors[0]
                }}
            >
                <FaThermometerThreeQuarters
                    className='icon'
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
            </styles.value>
            : null
        }
        {h1 !== undefined ?
            <styles.value
                style={{
                    borderColor: themes.default.traceColors[1]
                }}
            >
                <FaTint
                    className='icon'
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
            </styles.value>
            : null
        }
        {v1 !== undefined ?
            <styles.value
                style={{
                    borderColor: themes.default.traceColors[2]
                }}
            >
                <FaBolt
                    className='icon'
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
            </styles.value>
            : null
        }
        {i1 !== undefined ?
            <styles.value
                style={{
                    borderColor: themes.default.traceColors[3]
                }}
            >
                <FaEllipsisH
                    className='icon'
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
            </styles.value>
            : null
        }
        {v2 !== undefined ?
            <styles.value
                style={{
                    borderColor: themes.default.traceColors[4]
                }}
            >
                <FaBolt
                    className='icon'
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
            </styles.value>
            :null
        }
        {i2 !== undefined?
            <styles.value
                style={{
                    borderColor: themes.default.traceColors[5]
                }}
            >
                <FaEllipsisH
                    className='icon'
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
            </styles.value>
            : null
        }
    </styles.main>

export default Overview
