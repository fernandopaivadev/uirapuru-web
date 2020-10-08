import React from 'react'
import NavBar from '../panels/NavBar'
import Menu from '../panels/Menu'
import Chart from '../panels/Chart'

import { getData } from '../../services/storage'


import '../../styles/plot.css'

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
}]

const Plot = () => {

    return <div className='plot'>
        <NavBar />
        <div className='main'>
            <Menu
                title='Unidades'
                items={
                    getData('user').consumerUnits
                }
                subItemKey='devices'
            />
            <div className='chart-container'>
                <Chart collection={dataCollection} />
            </div>
        </div>

    </div>
}

export default Plot