import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faThermometerThreeQuarters,
    faTint,
    faBolt,
    faEllipsisH,
    faPlug,
    faArrowLeft,
    faArrowRight
} from '@fortawesome/free-solid-svg-icons'

import themes from '../../themes'
import '../../styles/realtime.css'

const RealTime = ({ payload, connected, navigateChart, setNavigateChart }) => {
    if(!connected) {
        payload = '{}'
    }

    const getEnergy = () => {
        return 'CALCULAR'
    }

    const values = JSON.parse(payload ?? '{}')
    const { t1, h1, v1, i1, v2, i2 } = values ?? {}

    return <div className='realtime'>
        <div className='arrow-container'>
            <FontAwesomeIcon
                className='arrow'
                icon={faArrowLeft}
                onClick={() => {
                    setNavigateChart(navigateChart - 1)
                }}
            />
            <FontAwesomeIcon
                className='arrow'
                icon={faArrowRight}
                onClick={() => {
                    setNavigateChart(navigateChart + 1)
                }}
            />
        </div>
        {!connected ?
            <h1 className='disconnected'>
                Desconectado
            </h1>
            :
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
                    <h1 className='text'>
                        T:
                    </h1>
                    <h1 className='payload'>
                        {t1} °C
                    </h1>
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
                    <h1 className='text'>
                        HRA:
                    </h1>
                    <h1 className='payload'>
                        {h1} %
                    </h1>
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
                    <h1 className='text'>
                        Vca:
                    </h1>
                    <h1 className='payload'>
                        {v1} V
                    </h1>
                </div>
                <div className='value'
                    style={{
                        borderColor: themes.default.traceColors[3]
                    }}
                >
                    <FontAwesomeIcon
                        className='icon'
                        icon={faBolt}
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
                    <h1 className='text'>
                        Vcc:
                    </h1>
                    <h1 className='payload'>
                        {v2} V
                    </h1>
                </div>
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
                <div className='value'
                    style={{
                        borderColor: themes.default.traceColors[6]
                    }}
                >
                    <FontAwesomeIcon
                        className='icon'
                        icon={faPlug}
                        style={{
                            color: themes.default.traceColors[6]
                        }}
                    />
                    <h1 className='text'>
                        Eca:
                    </h1>
                    <h1 className='payload'>
                        {getEnergy()}
                    </h1>
                </div>
                <div className='value'
                    style={{
                        borderColor: themes.default.traceColors[7]
                    }}
                >
                    <FontAwesomeIcon
                        className='icon'
                        icon={faPlug}
                        style={{
                            color: themes.default.traceColors[7]
                        }}
                    />
                    <h1 className='text'>
                        Ecc:
                    </h1>
                    <h1 className='payload'>
                        {getEnergy()}
                    </h1>
                </div>
            </div>
        }
    </div>
}

export default RealTime