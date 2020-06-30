import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faThermometerThreeQuarters,
    faTint,
    faBolt
} from '@fortawesome/free-solid-svg-icons'

import themes from '../../themes'
import '../../styles/realtime.css'

const RealTime = ({ payload, connected }) => {
    if(!connected) {
        payload = '{}'
    }

    const values = JSON.parse(payload ?? '{}')
    const { t1, h1, v1, i1, v2, i2 } = values ?? {}

    return <div className='realtime'>
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
                        Temperatura:
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
                        Umidade:
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
                        Tensão AC:
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
                        Corrente AC:
                    </h1>
                    <h1 className='payload'>
                        {i1} A
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
                        Tensão DC:
                    </h1>
                    <h1 className='payload'>
                        {v2} V
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
                        Corrente DC:
                    </h1>
                    <h1 className='payload'>
                        {i2} A
                    </h1>
                </div>
            </div>
        }
    </div>
}

export default RealTime