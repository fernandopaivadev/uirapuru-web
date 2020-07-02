import React, { useEffect, useState, memo } from 'react'

import { api } from '../../services/api'

import Plot from './Plot'

import '../../styles/graphic.css'
import '../../styles/util.css'

let mobile = false

window.onload = () => {
    const { innerHeight, innerWidth } = window

    if (innerHeight > innerWidth) {
        mobile = true
    }
}

const Graphic = ({ device, arrowCommand, setArrowCommand }) => {
    const [loading, setLoading] = useState(false)
    const [values, setValues] = useState([])
    const [timestamps, setTimestamps] = useState([])
    const [period, setPeriod] = useState({
        begin: new Date(),
        end: new Date()
    })
    const nDays = 1

    const getMessages = async () => {
        try {
            if(arrowCommand === 'back') {
                const begin = period.begin
                const end = period.end

                begin.setDate(begin.getDate() - nDays)
                end.setDate(end.getDate() - nDays)

                setPeriod({ begin, end })
            } else if (arrowCommand === 'forward') {
                const begin = period.begin
                const end = period.end

                begin.setDate(begin.getDate() + nDays)
                end.setDate(end.getDate() + nDays)

                setPeriod({ begin, end })
            }

            setLoading(true)
            if(arrowCommand) {
                setArrowCommand(null)
            }

            let begin = new Date()
            let end = new Date()

            begin.setDate(begin.getDate - nDays)

            if(!(period.begin || period.end)) {
                setPeriod({
                    begin,
                    end
                })
            } else {
                begin = period.begin
                end = period.end
            }

            const response = await api.get(
                `/device/messages?device=${
                    device.id
                }&from=${begin.toISOString()
                }&to=${end.toISOString()}`
            )

            const status = response?.status

            if (status === 200) {
                const messages = response?.data?.messages

                if (messages.length > 0) {
                    let _values = []
                    let _timestamps = []

                    messages.forEach(({ payload, timestamp }) => {
                        _values.push(JSON.parse(payload))
                        _timestamps.push(timestamp)
                    })

                    setValues(_values)
                    setTimestamps(_timestamps)
                } else {
                    setValues([])
                    setTimestamps([])
                }

                setLoading(false)
            }
        } catch (err) {
            console.log(err?.message ?? err?.response?.data?.message)
        }
    }

    useEffect(() => {
        getMessages()
        // eslint-disable-next-line
    }, [device, arrowCommand, period])

    const plotProps = {
        values,
        timestamps,
        mobile,
    }

    return (
        <div className="graphic">
            {loading ?
                <div className="loading-container">
                    <progress className="pure-material-progress-circular" />
                </div>
                : values.length > 0 ?
                    <Plot {...plotProps} />
                    :
                    <div className="empty">
                        <h1 className="text">Não há dados registrados</h1>
                    </div>
            }
        </div>
    )
}

export default memo(Graphic)
