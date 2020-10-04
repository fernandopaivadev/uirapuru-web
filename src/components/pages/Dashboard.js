import React, { useState } from 'react'
import NavBar from '../panels/NavBar'
import Menu from '../panels/Menu'
import Chart from '../panels/Chart'

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

const simulateData = () => {
    const data = new Array(10).fill(0)
    data.forEach((item, index) => {
        data[index] = Math.floor(Math.random() * 10)
    })
    return data
}

const dataCollection = [{
    title: 'Dispositivo 1',
    timestamps: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    datasets: [{
        label: 'Temperatura',
        data: simulateData()
    },{
        label: 'Umidade',
        data: simulateData()
    },{
        label: 'Vac',
        data: simulateData()
    },{
        label: 'Iac',
        data: simulateData()
    },{
        label: 'Vcc',
        data: simulateData()
    },{
        label: 'Icc',
        data: simulateData()
    }]
},{
    title: 'Dispositivo 2',
    timestamps: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    datasets: [{
        label: 'Temperatura',
        data: simulateData()
    },{
        label: 'Umidade',
        data: simulateData()
    },{
        label: 'Vac',
        data: simulateData()
    },{
        label: 'Iac',
        data: simulateData()
    },{
        label: 'Vcc',
        data: simulateData()
    },{
        label: 'Icc',
        data: simulateData()
    }]
},{
    title: 'Dispositivo 3',
    timestamps: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    datasets: [{
        label: 'Temperatura',
        data: simulateData()
    },{
        label: 'Umidade',
        data: simulateData()
    },{
        label: 'Vac',
        data: simulateData()
    },{
        label: 'Iac',
        data: simulateData()
    },{
        label: 'Vcc',
        data: simulateData()
    },{
        label: 'Icc',
        data: simulateData()
    }]
},{
    title: 'Dispositivo 4',
    timestamps: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    datasets: [{
        label: 'Temperatura',
        data: simulateData()
    },{
        label: 'Umidade',
        data: simulateData()
    },{
        label: 'Vac',
        data: simulateData()
    },{
        label: 'Iac',
        data: simulateData()
    },{
        label: 'Vcc',
        data: simulateData()
    },{
        label: 'Icc',
        data: simulateData()
    }]
},{
    title: 'Dispositivo 5',
    timestamps: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    datasets: [{
        label: 'Temperatura',
        data: simulateData()
    },{
        label: 'Umidade',
        data: simulateData()
    },{
        label: 'Vac',
        data: simulateData()
    },{
        label: 'Iac',
        data: simulateData()
    },{
        label: 'Vcc',
        data: simulateData()
    },{
        label: 'Icc',
        data: simulateData()
    }]
},{
    title: 'Dispositivo 6',
    timestamps: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    datasets: [{
        label: 'Temperatura',
        data: simulateData()
    },{
        label: 'Umidade',
        data: simulateData()
    },{
        label: 'Vac',
        data: simulateData()
    },{
        label: 'Iac',
        data: simulateData()
    },{
        label: 'Vcc',
        data: simulateData()
    },{
        label: 'Icc',
        data: simulateData()
    }]
},{
    title: 'Dispositivo 7',
    timestamps: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    datasets: [{
        label: 'Temperatura',
        data: simulateData()
    },{
        label: 'Umidade',
        data: simulateData()
    },{
        label: 'Vac',
        data: simulateData()
    },{
        label: 'Iac',
        data: simulateData()
    },{
        label: 'Vcc',
        data: simulateData()
    },{
        label: 'Icc',
        data: simulateData()
    }]
},{
    title: 'Dispositivo 8',
    timestamps: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    datasets: [{
        label: 'Temperatura',
        data: simulateData()
    },{
        label: 'Umidade',
        data: simulateData()
    },{
        label: 'Vac',
        data: simulateData()
    },{
        label: 'Iac',
        data: simulateData()
    },{
        label: 'Vcc',
        data: simulateData()
    },{
        label: 'Icc',
        data: simulateData()
    }]
}]

const realTime = {
    t1: '42.9',
    h1: '98',
    v1: '231',
    i1: '9',
    v2: '127',
    i2: '5'
}

const Dashboard = () => {
    const [consumerUnitIndex, setConsumerUnitIndex] = useState(0)

    return <div className='dashboard'>
        <NavBar />
        <div className='main'>
            <Menu
                title='Unidades'
                items={
                    getData('user').consumerUnits
                }
                subItemKey='devices'
                setItemIndex={setConsumerUnitIndex}
            />
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
                    {getData('user')
                        ?.consumerUnits[ consumerUnitIndex ]
                        ?.devices.map((device, index) =>
                            <li className='device' key={ index }>
                                <FontAwesomeIcon
                                    className='panelIcon'
                                    icon={faSolarPanel}
                                />
                                <p className='text'>
                                    { device.name }
                                </p>
                            </li>
                        )
                    }
                </ul>
            </div>
            <div className='charts'>
                <Chart
                    collection={dataCollection}
                    realTime={realTime}
                />
            </div>
        </div>
    </div>
}

export default Dashboard