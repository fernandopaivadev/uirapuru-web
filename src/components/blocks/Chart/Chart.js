import React, { useEffect } from 'react'

import { Chart as ChartJS } from 'chart.js'

import styles from './chart.style'

const Chart = ({ collection, theme, aspectRatio, fontSize, pointSize }) => {
    if (!fontSize) {
        fontSize = 14
    }

    if (!pointSize) {
        pointSize = 6
    }

    useEffect(() => {
        const { traceColors } = theme

        collection.forEach(({ datasets, labels }, index) => {
            datasets.forEach((dataset, index) => {
                dataset.borderColor = traceColors[index]
                dataset.backgroundColor = `${traceColors[index]}1f`
                dataset.pointBorderColor = traceColors[index]
                dataset.pointBackgroundColor = traceColors[index]
                dataset.borderWidth = 1.5
                dataset.pointHoverRadius = pointSize
                dataset.pointRadius = pointSize
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
                            fontSize
                        }
                    },
                    tooltips: {
                        mode: 'index',
                        axis: 'y',
                        backgroundColor: '#333',
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                min: -500,
                                max: 1500,
                                fontSize,
                                fontColor: theme.primaryFontColor
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                fontSize,
                                fontColor: theme.primaryFontColor
                            }
                        }]
                    }
                }
            })
        })
    })

    return <styles.main
        id='chart'
        data-testid='main'
    >
        {collection.map((chart, chartIndex) =>
            chart ?
                <styles.chart
                    data-testid='chart'
                    key={chartIndex}
                >
                    <styles.title
                        data-testid='title'
                    >
                        {chart.title}
                    </styles.title>
                    <canvas
                        id={`chart-${chartIndex}`}
                        data-testid={`chart-${chartIndex}`}
                    />
                </styles.chart>
                :
                <styles.error
                    id='error'
                    alt='error'
                    role='error'
                    data-testid='error'
                >
                    <p>Não foi possível obter os dados</p>
                </styles.error>
        )}
    </styles.main>
}

export default Chart
