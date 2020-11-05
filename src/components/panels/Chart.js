import React, { useEffect } from 'react'

import { Chart as ChartJS } from 'chart.js'

import themes from '../../themes'

import '../../styles/chart.css'

const Chart = ({ collection, realTime, aspectRatio, showDots }) => {
    const { default: { traceColors } } = themes

    useEffect(() => {
        collection.forEach(({ datasets, timestamps }, index) => {
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

    return <div className='chart'>
        {collection.map((chart, chartIndex) =>
            chart ?
                <div className='chart-view' key={chartIndex}>
                    <h1>{ chart.title } </h1>
                    <canvas id={`chart-${chartIndex}`}/>
                    {realTime?.length > 0 ?
                        <ul className='real-time'>
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
                        </ul>
                        : null
                    }
                </div>
                :
                <div className='chart-error'>
                    <p>Não foi possível obter os dados</p>
                </div>
        )}
    </div>
}

export default Chart