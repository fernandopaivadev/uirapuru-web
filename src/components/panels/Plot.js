import React, { memo, lazy, Suspense } from 'react'

import themes from '../../themes'

const Plotly = lazy(() => import('react-plotly.js'))

const Plot = ({ values, timestamps,  doubleScreen, mobile, setEnergyValue }) => {
    let time = []

    timestamps.forEach(timestamp => {
        time.push(new Date(String(timestamp)))
    })

    let temperature1 = []
    let humidity1 = []
    let voltage1 = []
    let current1 = []
    let voltage2 = []
    let current2 = []

    values.forEach(values => {
        const { t, h, t1, h1, v1, i1, v2, i2  } = values ?? {}

        temperature1.push(t1 ?? t)
        humidity1.push(h1 ?? h)
        voltage1.push(v1)
        current1.push(i1)
        voltage2.push(v2)
        current2.push(i2)
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
            y: [...temperature1],
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
            y: [...humidity1],
            hovertemplate: '%{y} %'
        },
        {
            mode: 'lines',
            name: 'Tensão CA (V)',
            line: {
                color: themes.default.traceColors[2],
                width: 2
            },
            x: [...time],
            y: [...voltage1],
            hovertemplate: '%{y} V'
        },
        {
            mode: 'lines',
            name: 'Corrente CA (A)',
            line: {
                color: themes.default.traceColors[3],
                width: 2
            },
            x: [...time],
            y: [...current1],
            hovertemplate: '%{y} A'
        },
        {
            mode: 'lines',
            name: 'Tensão CC (V)',
            line: {
                color: themes.default.traceColors[4],
                width: 2
            },
            x: [...time],
            y: [...voltage2],
            hovertemplate: '%{y} V'
        },
        {
            mode: 'lines',
            name: 'Corrente CC (A)',
            line: {
                color: themes.default.traceColors[5],
                width: 2
            },
            x: [...time],
            y: [...current2],
            hovertemplate: '%{y} A'
        }
    ]

    return (
        <Suspense fallback="" className="plot">
            <Plotly
                data={[...traces]}
                layout={{
                    dragmode: 'select',
                    selectdirection: 'h',
                    modebar: {},
                    showlegend: true,
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
                        fixedrange: false
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
                    height: '90vh',
                    width: '95%'
                }}
                onSelected={event => {
                    try {
                        const begin = time.indexOf(Date(event.range.x[0]))
                        const end = time.indexOf(Date(event.range.x[1]))
                        console.log(event.range.x[0], event.range.x[1])
                        let acEnergy = null
                        let dcEnergy = null

                        for (let k = begin; k < end; k++) {
                            acEnergy += voltage1[k] * current1[k]
                            dcEnergy += voltage2[k] * current2[k]
                        }

                        setEnergyValue({
                            ac: acEnergy,
                            dc: dcEnergy
                        })
                    } catch (err) {
                        console.log(err.message)
                    }
                }}
            />
        </Suspense>
    )
}

export default memo(Plot)
