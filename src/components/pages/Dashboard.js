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

import miniChart from '../../assets/miniChart.png'

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
            <div className='overview'>
                <div className='displays'>
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
                            10 °C
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
                            30  %
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
                            58 V
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
                                220 V
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
                            26 °C
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
                            50  %
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
                            220 V
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
                                110 V
                            </h1>
                        </div>
                    </div>
                </div>
                <ul className='devices'>
                    <li className='device'
                    >
                        <FontAwesomeIcon
                            className='iconPanel'
                            icon={faSolarPanel}
                        />
                        <h1 className='text'>
                            Dispositivo 1
                        </h1>
                    </li>
                    <li className='device'>
                        <FontAwesomeIcon
                            className='iconPanel'
                            icon={faSolarPanel}
                        />
                        <h1 className='text'>
                            Dispositivo 2
                        </h1>
                    </li>
                    <li className='device'>
                        <FontAwesomeIcon
                            className='iconPanel'
                            icon={faSolarPanel}
                        />
                        <h1 className='text'>
                            Dispositivo 3
                        </h1>
                    </li>
                    <li className='device'>
                        <FontAwesomeIcon
                            className='iconPanel'
                            icon={faSolarPanel}
                        />
                        <h1 className='text'>
                            Dispositivo 4
                        </h1>
                    </li>
                    <li className='device'
                    >
                        <FontAwesomeIcon
                            className='iconPanel'
                            icon={faSolarPanel}
                        />
                        <h1 className='text'>
                            Dispositivo 5
                        </h1>
                    </li>
                    <li className='device'>
                        <FontAwesomeIcon
                            className='iconPanel'
                            icon={faSolarPanel}
                        />
                        <h1 className='text'>
                            Dispositivo 6
                        </h1>
                    </li>
                    <li className='device'>
                        <FontAwesomeIcon
                            className='iconPanel'
                            icon={faSolarPanel}
                        />
                        <h1 className='text'>
                            Dispositivo 7
                        </h1>
                    </li>
                    <li className='device'>
                        <FontAwesomeIcon
                            className='iconPanel'
                            icon={faSolarPanel}
                        />
                        <h1 className='text'>
                            Dispositivo 8
                        </h1>
                    </li>
                </ul>
            </div>
            <div className='graphics'>
                <div className='graphic'>
                    <img src={miniChart} alt='gráfico'/>
                </div>
                <h1>Dispositivo 1</h1>
                <div className='graphic'>
                    <img src={miniChart} alt='gráfico' />
                    <h1>Dispositivo 2</h1>
                </div>
                <div className='graphic'>
                    <img src={miniChart} alt='gráfico' />
                    <h1>Dispositivo 3</h1>
                </div>
                <div className='graphic'>
                    <img src={miniChart} alt='gráfico' />
                    <h1>Dispositivo 4</h1>
                </div>
                <div className='graphic'>
                    <img src={miniChart} alt='gráfico' />
                    <h1>Dispositivo 5</h1>
                </div>
            </div>
        </div>
    </div>
}

export default Dashboard