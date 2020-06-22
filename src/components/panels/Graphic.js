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

const Graphic = ({ device }) => {
    const [loading, setLoading] = useState(false)
    const [values, setValues] = useState([])
    const [timestamps, setTimestamps] = useState([])

    const getMessages = async () => {
        try {
            const now = new Date()
            const before = new Date()

            before.setDate(before.getDate() - 180)
 
            setLoading(true)

            const response = await api.get(
                `/device/messages?device=${
                    device.id
                }&from=${before.toISOString()}&to=${now.toISOString()}`
            )

            const status = response?.status

            if (status === 200) {
                const messages = response?.data?.messages

                if (messages.length > 0) {
                    let _values = []
                    let _timestamps = []

                    messages.forEach(message => {
                        _values.push(JSON.parse(message.payload))
                        _timestamps.push(message.timestamp)
                    })

                    setValues(_values)
                    setTimestamps(_timestamps)
                    console.log(values)
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
    }, [device])

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
