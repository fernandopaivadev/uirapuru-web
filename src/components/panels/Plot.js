import React, { memo, lazy, Suspense } from 'react'

import themes from '../../themes'

const Plotly = lazy(() => import('react-plotly.js'))

const Plot = ({ values, timestamps,  doubleScreen, mobile }) => {
    let time = []
    let timeString = []

    timestamps.forEach(timestamp => {
        time.push(new Date(String(timestamp)))
        timeString.push(new Date(String(timestamp)).toLocaleString())
    })

    let temperature1 = []
    let humidity1 = []
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
    })

    const traces = [
        {
            mode: 'lines',
            name: 'Temperatura 1 (°C)',
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
            name: 'Umidade 1 (%)',
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
            name: 'Tensão 1 (V)',
            line: {
                color: themes.default.traceColors[2],
                width: 2
            },
            x: [...time],
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
                    showlegend: false,
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
            />
        </Suspense>
    )
}

export default memo(Plot)
