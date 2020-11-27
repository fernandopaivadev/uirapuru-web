import React, { useEffect } from 'react'

import { Chart as ChartJS } from 'chart.js'

import storage from '../../services/storage'

import { themes } from '../../styles/themes'

import styles from '../../styles/chart'

const Chart = ({ collection, realTime, aspectRatio, showDots }) => {
    const theme = themes[storage.read('theme')]
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

    const keyToUnity = key => {
        switch (key) {
        case 't1':
            return ' °C'
        case 'h1':
            return ' %'
        case 'v1':
            return ' V'
        case 'v2':
            return ' V'
        case 'i1':
            return ' A'
        case 'i2':
            return ' A'
        }
    }

    const keyToIdentifier = key => {
        switch (key) {
        case 't1':
            return 'T: '
        case 'h1':
            return 'U.R.A: '
        case 'v1':
            return 'Vac: '
        case 'v2':
            return 'Vcc: '
        case 'i1':
            return 'Iac: '
        case 'i2':
            return 'Icc: '
        }
    }

    return <styles.main>
        {collection.map((chart, chartIndex) =>
            chart ?
                <styles.chart key={chartIndex}>
                    <styles.title>{ chart.title } </styles.title>
                    <canvas id={`chart-${chartIndex}`}/>
                    {realTime?.length > 0 ?
                        <styles.realTime>
                            {Object.keys(realTime[chartIndex])
                                .map((key, keyIndex) =>
                                    <li key={keyIndex}>
                                        <p style={{
                                            color: traceColors[keyIndex]
                                        }}>
                                            {keyToIdentifier(key)}
                                            {realTime[chartIndex][key]}
                                            {keyToUnity(key)}
                                        </p>
                                    </li>
                                )}
                        </styles.realTime>
                        : null
                    }
                </styles.chart>
                :
                <styles.error>
                    <p>Não foi possível obter os dados</p>
                </styles.error>
        )}
    </styles.main>
}

export default Chart
