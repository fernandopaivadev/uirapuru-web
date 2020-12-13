import React, { useEffect } from 'react'

import { Chart as ChartJS } from 'chart.js'

import storage from '../../services/storage'

import { themes } from '../../styles/themes'

import styles from '../../styles/chart'

const Chart = ({ collection, aspectRatio, showDots }) => {
    const theme = themes[storage.read('theme') ?? 'default']
    const { traceColors } = theme

    useEffect(() => {
        collection.forEach(({ datasets, labels }, index) => {
            datasets.forEach((dataset, index) => {
                dataset.borderColor = traceColors[index]
                dataset.backgroundColor = `${traceColors[index]}1f`
                dataset.pointBorderColor = traceColors[index]
                dataset.pointBackgroundColor = traceColors[index]
                dataset.borderWidth = 1.5
                dataset.pointRadius = showDots ? 2 : 0
                dataset.fill = true
                dataset.cubicInterpolationMode = 'linear'
            })

            const context = document.querySelector(
                `#chart-${index}`
            ).getContext('2d')

            new ChartJS(context, {
                type: 'line',
                data: {
                    labels,
                    datasets
                },
                options: {
                    animation: false,
                    devicePixelRatio: 2,
                    responsive: true,
                    aspectRatio: aspectRatio ?? 2.4,
                    maintainAspectRatio: true,
                    legend: {
                        labels: {
                            boxWidth: 10,
                            fontColor: theme.primaryFontColor,
                            fontSize: 15
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
                                beginAtZero: true,
                                min: -500,
                                max: 1500,
                                fontSize: 15,
                                fontColor: theme.primaryFontColor
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                fontSize: 15,
                                fontColor: theme.primaryFontColor
                            }
                        }]
                    }
                }
            })
        })
    })

    return <styles.main>
        {collection.map((chart, chartIndex) =>
            chart ?
                <styles.chart key={chartIndex}>
                    <styles.title>{chart.title} </styles.title>
                    <canvas id={`chart-${chartIndex}`}/>
                </styles.chart>
                :
                <styles.error>
                    <p>Não foi possível obter os dados</p>
                </styles.error>
        )}
    </styles.main>
}

export default Chart
