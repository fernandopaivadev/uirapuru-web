import React from 'react'

import { Chart as ChartJS } from 'chart.js'

import '../../styles/chart.css'

const Chart = ({ collection }) => {
    const chartStyle = [
        'rgba(54, 162, 235)',
        'rgba(255, 99, 132)'
    ]

    document.addEventListener('DOMContentLoaded', () => {
        collection.forEach(({ datasets, timestamps }, index) => {
            datasets.forEach((dataset, index) => {
                dataset.borderColor = new Array(dataset.length).fill(chartStyle[index])
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
                        <p>
                    T: 27 º C
                        </p>
                    </li>
                    <li>
                        <p>
                    H: 298 % H.R.
                        </p>
                    </li>
                    <li>
                        <p>
                    T: 27 º C
                        </p>
                    </li>
                    <li>
                        <p>
                    H: 298 % H.R.
                        </p>
                    </li>
                    <li>
                        <p>
                    T: 27 º C
                        </p>
                    </li>
                    <li>
                        <p>
                    H: 298 % H.R.
                        </p>
                    </li>
                </ul>
            </div>
        )}
    </div>
}

export default Chart