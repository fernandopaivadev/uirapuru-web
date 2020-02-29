import React, { memo, lazy, Suspense } from 'react'

import themes from '../../themes'

const Plotly = lazy(() => import('react-plotly.js'))

const Plot = ({ values, timestamps, setDisplay, doubleScreen }) => {
    let time = []
    let timeString = []

    timestamps.forEach(timestamp => {
        time.push(new Date(String(timestamp)))
        timeString.push(new Date(String(timestamp)).toLocaleString())
    })

    let temperature = []
    let humidity = []
    let voltage = []

    values.forEach(values => {
        const { t, h, v1 } = values ?? {}

        temperature.push(t)
        humidity.push(h)
        voltage.push(v1)
    })

    const maxVoltage = Math.max(...voltage)
    let voltageLevel = []

    voltage.forEach(voltage => {
        const level = (voltage / maxVoltage) * 100
        voltageLevel.push(level.toFixed(2))
    })

    const traces = [
        {
            mode: 'lines+markers',
            name: 'Temperatura (°C)',
            marker: {
                color: themes.default.traceColors[0],
                size: 8
            },
            line: {
                width: 2
            },
            x: [...time],
            y: [...temperature],
            hovertemplate: '%{y} °C'
        },
        {
            mode: 'lines+markers',
            name: 'Umidade (%)',
            marker: {
                color: themes.default.traceColors[1],
                size: 8
            },
            line: {
                width: 2
            },
            x: [...time],
            y: [...humidity],
            hovertemplate: '%{y} %'
        },
        {
            mode: 'lines+markers',
            name: 'Tensão (V)',
            marker: {
                color: themes.default.traceColors[2],
                size: 8
            },
            line: {
                width: 2
            },
            x: [...time],
            y: [...voltage],
            hovertemplate: '%{y} V'
        },
        {
            mode: 'lines+markers',
            name: 'Nível de Tensão (%)',
            marker: {
                color: themes.default.traceColors[3],
                size: 8
            },
            line: {
                width: 2
            },
            x: [...time],
            y: [...voltageLevel],
            hovertemplate: '%{y} %'
        }
    ]

    return (
        <Suspense fallback=''>
            <Plotly
                data={[...traces]}
                layout={{
                    //dragmode: 'pan',
                    modebar: {
                        color: themes.default.green
                    },
                    legend: {
                        orientation: 'h',
                        x: 0.0,
                        y: 1.05,
                        font: {
                            size: doubleScreen ? 16 : 20
                        }
                    },
                    hoverlabel: {
                        font: {
                            size: 30,
                            color: themes.default.white
                        }
                    },
                    margin: {
                        l: 30,
                        r: 30,
                        b: 120,
                        t: 50,
                        pad: 0
                    },
                    uirevision: false,
                    spikedistance: -1,
                    xaxis: {
                        showgrid: false,
                        showspikes: true,
                        spikemode: 'across',
                        spikesnap: 'cursor',
                        //spikesnap: 'data',
                        spikedash: 'solid',
                        spikecolor: themes.default.lightGray,
                        spikethickness: 2
                    },
                    yaxis: {
                        fixedrange: true
                    }
                }}
                config={{
                    scrollZoom: true,
                    toImageButtonOptions: {
                        filename: 'Uirapuru_Graph',
                        format: 'png',
                        width: '2560',
                        height: '1440'
                    },
                    displaylogo: false,
                    displayModeBar: true,
                    //!---------------------------------------------------
                    /*//! BUTTON NAMES
                "zoom2d", "pan2d", "select2d", "lasso2d",
                "zoomIn2d", "zoomOut2d", "autoScale2d",
                "resetScale2d", "hoverClosestCartesian",
                "hoverCompareCartesian", "zoom3d", "pan3d",
                "resetCameraDefault3d", "resetCameraLastSave3d",
                "hoverClosest3d", "orbitRotation", "tableRotation",
                "zoomInGeo", "zoomOutGeo", "resetGeo",
                "hoverClosestGeo", "toImage", "sendDataToCloud",
                "hoverClosestGl2d", "hoverClosestPie", "toggleHover",
                "resetViews", "toggleSpikelines", "resetViewMapbox"
                */
                    //!---------------------------------------------------
                    modeBarButtons: [
                        [
                            'toImage',
                            'hoverClosestCartesian',
                            'hoverCompareCartesian',
                            'sendDataToCloud'
                        ]
                    ]
                }}
                style={{
                    height: '100vh',
                    width:
                        window.innerWidth > 2500
                            ? doubleScreen
                                ? '46vw'
                                : '92vw'
                            : window.innerWidth > 1400
                                ? doubleScreen
                                    ? '44vw'
                                    : '88vw'
                                : doubleScreen
                                    ? '42.5vw'
                                    : '85vw'
                }}
                onClick={event => {
                    const selectedTime = new Date(
                        event?.points[0]?.x
                    ).toLocaleString()
                    const index = timeString.indexOf(selectedTime)

                    setDisplay({
                        time: selectedTime,
                        humidity: humidity[index],
                        temperature: temperature[index],
                        voltage: voltage[index],
                        voltageLevel: voltageLevel[index]
                    })
                }}
            />
        </Suspense>
    )
}

export default memo(Plot)
