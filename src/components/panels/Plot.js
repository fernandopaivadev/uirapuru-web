import React, { memo, lazy, Suspense } from 'react'

import themes from '../../themes'

const Plotly = lazy(() => import('react-plotly.js'))

const Plot = ({ values, timestamps, setDisplay, doubleScreen, mobile }) => {
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
        //const { t, h, v1 } = values ?? {}
        const { t, v1 } = values ?? {}

        temperature.push(t)
        //humidity.push(h)
        voltage.push(v1)
    })

    const maxVoltage = Math.max(...voltage)
    let voltageLevel = []

    voltage.forEach(voltage => {
        const level = voltage / maxVoltage * 100
        voltageLevel.push(level.toFixed(2))
    })

    const traces = [
        {
            mode: 'lines',
            name: 'Temperatura (°C)',
            line: {
                color: themes.default.traceColors[0],
                width: 2
            },
            x: [...time],
            y: [...temperature],
            hovertemplate: '%{y} °C'
        },
        {
            mode: 'lines',
            name: 'Umidade (%)',
            line: {
                color: themes.default.traceColors[1],
                width: 2
            },
            x: [...time],
            y: [...humidity],
            hovertemplate: '%{y} %'
        },
        {
            mode: 'lines',
            name: 'Tensão (V)',
            line: {
                color: themes.default.traceColors[2],
                width: 2
            },
            x: [...time],
            y: [...voltage],
            hovertemplate: '%{y} V'
        },
        {
            mode: 'lines',
            name: 'Nível de Tensão (%)',
            line: {
                color: themes.default.traceColors[3],
                width: 2
            },
            x: [...time],
            y: [...voltageLevel],
            hovertemplate: '%{y} %'
        }
    ]

    return <Suspense fallback='' className='plot'>
        <Plotly
            data={[...traces]}
            layout={{
                //dragmode: 'pan',
                modebar: {
                    color: themes.default.green
                },
                //showlegend: !mobile,
                legend: {
                    orientation: 'h',
                    x: 0.0,
                    y: 10,
                    font: {
                        size: mobile ?
                            12
                            :
                            doubleScreen ? 16 : 20
                    }
                },
                hoverlabel: {
                    font: {
                        size: mobile ? 18 : 24,
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
                //displayModeBar: true,
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
                height: '90vh',
                width: doubleScreen ? '45vw' : '90vw'
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
}

export default memo(Plot)
