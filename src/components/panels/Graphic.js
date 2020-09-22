import React, { useEffect, useState, memo, useCallback } from 'react'

import { api } from '../../services/api'

import Plot from './Plot'

import '../../styles/graphic.css'
import '../../styles/util.css'


const Graphic = ({ deviceId, setEnergyValue, datePicker }) => {
    const [loading, setLoading] = useState(false)
    const [values, setValues] = useState([])
    const [timestamps, setTimestamps] = useState([])

    const isLeapYear = year =>
        year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)


    const getMessages = useCallback(async () => {
        try {
            let [day, month, year] = datePicker.split('/')

            day = Number(day)
            month = Number(month) - 1
            year = Number(year)

            let begin = new Date()
            let end = new Date()

            begin.setHours(0)
            begin.setMinutes(0)
            begin.setSeconds(0)
            begin.setMilliseconds(0)

            end.setHours(0)
            end.setMinutes(0)
            end.setSeconds(0)
            end.setMilliseconds(0)

            begin.setDate(day)
            end.setDate(day + 1)

            begin.setMonth(month)

            if (month === 1) {
                if(isLeapYear(year) && day === 29) {
                    end.setMonth(month + 1)
                    end.setDate(1)
                } else if(!isLeapYear(year) && day === 28) {
                    end.setMonth(month + 1)
                    end.setDate(1)
                }
            } else if ([3, 5, 8, 10].includes(month) && day === 30) {
                end.setMonth(month + 1)
                end.setDate(1)
            } else if (day === 31) {
                end.setMonth(month + 1)
                end.setDate(1)
            } else {
                end.setMonth(month)
            }

            begin.setFullYear(year)
            end.setFullYear(year)

            setLoading(true)

            const response = await api.get(
                `/device/messages?device=${
                    deviceId
                }&from=${begin.toISOString()
                }&to=${end.toISOString()}`
            )

            const status = response?.status

            if (status === 200) {
                const messages = response?.data?.messages

                if (messages.length > 0) {
                    let _values = []
                    let _timestamps = []

                    messages.forEach(({ payload }) => {
                        const dataObject = JSON.parse(payload)
                        _values.push(dataObject)
                        _timestamps.push(dataObject.rtc)
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
    }, [deviceId, datePicker])

    useEffect(() => {
        getMessages()
    }, [getMessages])

    const plotProps = {
        values,
        timestamps,
        setEnergyValue
    }

    return (
        <div className="graphic">
            {loading ?
                <div className="loading-container">
                    <progress className="circular-progress" />
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
