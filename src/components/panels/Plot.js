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

<<<<<<< HEAD
    let temperature1 = []
    let humidity1 = []
    let voltage = []
    let voltage1 = []
    let current1 = []
    let voltage2 = []
    let current2 = []
    let voltage3 = []
    let current3 = []
    let voltage4 = []
    let current4 = []

    values.forEach(values => {
        const { t, h, t1, h1, v1, i1, v2, i2, v3, i3, v4, i4 } = values ?? {}

        temperature1.push(t1 ?? t)
        humidity1.push(h1 ?? h)
        voltage1.push(v1)
        current1.push(i1)
        voltage2.push(v2)
        current2.push(i2)
        voltage3.push(v3)
        current3.push(i3)
        voltage4.push(v4)
        current4.push(i4)
=======
    let temperature = []
    let humidity = []
    let voltage = []

    values.forEach(values => {
        //const { t, h, v1 } = values ?? {}
        const { t, v1 } = values ?? {}

        temperature.push(t)
        //humidity.push(h)
        voltage.push(v1)
>>>>>>> 1117c4f3f0e8118264dfebe75ced234abcf5108f
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
<<<<<<< HEAD
            name: 'Temperatura 1 (°C)',
=======
            name: 'Temperatura (°C)',
>>>>>>> 1117c4f3f0e8118264dfebe75ced234abcf5108f
            line: {
                color: themes.default.traceColors[0],
                width: 2
            },
            x: [...time],
<<<<<<< HEAD
            y: [...temperature1],
=======
            y: [...temperature],
>>>>>>> 1117c4f3f0e8118264dfebe75ced234abcf5108f
            hovertemplate: '%{y} °C'
        },
        {
            mode: 'lines',
<<<<<<< HEAD
            name: 'Umidade 1 (%)',
=======
            name: 'Umidade (%)',
>>>>>>> 1117c4f3f0e8118264dfebe75ced234abcf5108f
            line: {
                color: themes.default.traceColors[1],
                width: 2
            },
            x: [...time],
<<<<<<< HEAD
            y: [...humidity1],
=======
            y: [...humidity],
>>>>>>> 1117c4f3f0e8118264dfebe75ced234abcf5108f
            hovertemplate: '%{y} %'
        },
        {
            mode: 'lines',
<<<<<<< HEAD
            name: 'Tensão 1 (V)',
=======
            name: 'Tensão (V)',
>>>>>>> 1117c4f3f0e8118264dfebe75ced234abcf5108f
            line: {
                color: themes.default.traceColors[2],
                width: 2
            },
            x: [...time],
<<<<<<< HEAD
            y: [...voltage1],
            hovertemplate: '%{y} V'
        }
    ]

    return (
        <Suspense fallback="" className="plot">
            <Plotly
                data={[...traces]}
                layout={{
                    //dragmode: 'pan',
                    modebar: {},
                    legend: {
                        orientation: 'h',
                        x: 0.0,
                        y: 10,
                        font: {
                            size: mobile ? 12 : doubleScreen ? 16 : 20
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
                    //displaylogo: false,
                    //displayModeBar: true,
                    //!---------------------------------------------------
                    /*//! BUTTON NAMES
=======
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
>>>>>>> 1117c4f3f0e8118264dfebe75ced234abcf5108f
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
<<<<<<< HEAD
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
                    height: '80vh',
                    width: '70vw'
                }}
                onClick={event => {
                    const selectedTime = new Date(
                        event?.points[0]?.x
                    ).toLocaleString()

                    const index = timeString.indexOf(selectedTime)

                    setDisplay({
                        time: selectedTime,

                        humidity1: humidity1[index],
                        temperature1: temperature1[index],

                        voltage1: voltage1[index],
                        current1: current1[index],

                        voltage2: voltage2[index],
                        current2: current2[index],

                        voltage3: voltage3[index],
                        current3: current3[index],

                        voltage4: voltage4[index],
                        current4: current4[index],
                    })
                }}
            />
        </Suspense>
    )
=======
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
>>>>>>> 1117c4f3f0e8118264dfebe75ced234abcf5108f
}

export default memo(Plot)
