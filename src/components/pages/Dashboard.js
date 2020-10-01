import React from 'react'
import NavBar from '../panels/NavBar'
import Menu from '../panels/Menu'
import { getData } from '../../services/storage'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import themes from '../../themes'

import {
    faThermometerThreeQuarters,
    faTint,
    faBolt,
    faEllipsisH,
    faSolarPanel
} from '@fortawesome/free-solid-svg-icons'

import '../../styles/dashboard.css'

const Dashboard = () => {
    return <div className='dashboard'>
        <NavBar />
        <Menu
            title='Unidades'
            items = {getData('user').consumerUnits}
            subItemKey='devices'
        />
        <div className='main'>
            <div className='params'>
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
                            ? °C
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
                            ?  %
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
                            ? V
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
                                ? V
                        </h1>
                    </div>
                </div>
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
                            ? °C
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
                            ?  %
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
                            ? V
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
                                ? V
                        </h1>
                    </div>
                </div>
                <ul className='panels'>
                    <div className='valuePanel'
                    >
                        <FontAwesomeIcon
                            className='iconPanel'
                            icon={faSolarPanel}
                        />
                        <h1 className='text'>
                            Dispositivo 1
                        </h1>
                    </div>
                </ul>
            </div>
        </div>
    </div>
}

export default Dashboard