import React from 'react'

import { Chart as ChartJS } from 'chart.js'

import themes from '../../themes'

import '../../styles/chart.css'

const Chart = ({ collection, realTime }) => {
    if (!realTime) {
        realTime = {
            t1: '29.84',
            h1: '98',
            v1: '200',
            i1: '9',
            v2: '127',
            i2: '5'
        }
    }

    const { default: { traceColors } } = themes

    document.addEventListener('DOMContentLoaded', () => {
        collection.forEach(({ datasets, timestamps }, index) => {
            datasets.forEach((dataset, index) => {
                dataset.borderColor = new Array(
                    dataset.length
                ).fill(traceColors[index])
                dataset.backgroundColor = '#00000000'
                dataset.borderWidth = 2
            })

            const context = document.querySelector(
                `#chart-${index}`
            ).getContext('2d')

            new ChartJS(context, {
                responsive: true,
                devicePixelRatio: '2',
                type: 'line',
                data: {
                    labels: timestamps,
                    datasets
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            })
        })
    })

    return <div className='chart'>
        {collection.map((dataset, index) =>
            <div className='chart-view' key={index}>
                <canvas id={`chart-${index}`}/>
                <ul className='real-time'>
                    <li>
                        <p style={{
                            color: traceColors[0]
                        }}>
                            T: { realTime.t1 } °C
                        </p>
                    </li>
                    <li>
                        <p style={{
                            color: traceColors[1]
                        }}>
                            H: { realTime.h1 } % H.R.A
                        </p>
                    </li>
                    <li>
                        <p style={{
                            color: traceColors[2]
                        }}>
                            Vca: { realTime.v1 } V
                        </p>
                    </li>
                    <li>
                        <p style={{
                            color: traceColors[3]
                        }}>
                            Ica: { realTime.i1 } A
                        </p>
                    </li>
                    <li>
                        <p style={{
                            color: traceColors[4]
                        }}>
                            Vcc: { realTime.v1 } V
                        </p>
                    </li>
                    <li>
                        <p style={{
                            color: traceColors[5]
                        }}>
                            Icc: { realTime.i2 } A
                        </p>
                    </li>
                </ul>
            </div>
        )}
    </div>
}

export default Chart