import React from 'react'

import { Chart as ChartJS } from 'chart.js'

import '../../styles/chart.css'

const Chart = () => {
    document.addEventListener('DOMContentLoaded',() => {
        const context = document.getElementById('chart').getContext('2d')
        new ChartJS(context, {
            type: 'line',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes for A',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1
                },
                {
                    label: '# of Votes for B',
                    data: [5, 7, 1, 9, 4, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
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

    return <div className='chart'>
        <canvas id='chart'/>
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
}

export default Chart