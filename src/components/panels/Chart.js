import React, { useEffect } from 'react'

import { Chart as ChartJS } from 'chart.js'

import themes from '../../themes'

import '../../styles/chart.css'

const Chart = ({ collection, realTime, aspectRatio }) => {
    const { default: { traceColors } } = themes

    useEffect(() => {
        collection.forEach(({ datasets, timestamps }, index) => {
            datasets.forEach((dataset, index) => {
                dataset.borderColor = traceColors[index]
                dataset.backgroundColor = `${traceColors[index]}1f`
                dataset.pointBorderColor = traceColors[index]
                dataset.pointBackgroundColor = traceColors[index]
                dataset.borderWidth = 1.5
                dataset.pointRadius = 0
                dataset.fill = true
                dataset.cubicInterpolationMode = 'linear'
            })

            const context = document.querySelector(
                `#chart-${index}`
            ).getContext('2d')

            new ChartJS(context, {
                type: 'line',
                data: {
                    labels: timestamps,
                    datasets
                },
                options: {
                    animation: false,
                    devicePixelRatio: 2,
                    responsive: true,
                    aspectRatio: aspectRatio ?? 2.6,
                    maintainAspectRatio: true,
                    legend: {
                        labels: {
                            boxWidth: 10,

                        }
                    },
                    tooltips: {
                        mode: 'index',
                        axis: 'y',
                        intersect: false,
                        backgroundColor: '#333',

                    },
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
        {collection.map(({ title }, index) =>
            <div className='chart-view' key={index}>
                <h1>{ title } </h1>
                <canvas id={`chart-${index}`}/>
                {realTime?.length > 0 ?
                    <ul className='real-time'>
                        <li>
                            <p style={{
                                color: traceColors[0]
                            }}>
                            T: { realTime[index].t1 } °C
                            </p>
                        </li>
                        <li>
                            <p style={{
                                color: traceColors[1]
                            }}>
                                H.R.A: { realTime[index].h1 } %
                            </p>
                        </li>
                        <li>
                            <p style={{
                                color: traceColors[2]
                            }}>
                                Vca: { realTime[index].v1 } V
                            </p>
                        </li>
                        <li>
                            <p style={{
                                color: traceColors[3]
                            }}>
                                Ica: { realTime[index].i1 } A
                            </p>
                        </li>
                        <li>
                            <p style={{
                                color: traceColors[4]
                            }}>
                                Vcc: { realTime[index].v1 } V
                            </p>
                        </li>
                        <li>
                            <p style={{
                                color: traceColors[5]
                            }}>
                                Icc: { realTime[index].i2 } A
                            </p>
                        </li>
                    </ul>
                    : null
                }
            </div>
        )}
    </div>
}

export default Chart