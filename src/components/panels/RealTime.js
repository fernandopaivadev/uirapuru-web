import React, { useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faThermometerThreeQuarters,
    faTint,
    faBolt,
    faEllipsisH,
    faArrowRight,
    faArrowLeft
    //faPlug,
} from '@fortawesome/free-solid-svg-icons'

import themes from '../../themes'
import '../../styles/realtime.css'

const RealTime = ({
    payload,
    connected,
    datePicker,
    setDatePicker
    /*energyValue*/
}) => {
    if(!connected) {
        payload = '{}'
    }

    const values = JSON.parse(payload ?? '{}')
    const { t1, h1, v1, i1, v2, i2 } = values ?? {}

    const changeDate = (direction) => {
        const [day, month, year] = datePicker.split('/')
        const currentDate = new Date(`${year}-${month}-${day}`)
        let newDate = null

        if (direction === 'prev') {
            newDate = new Date(
                currentDate.getTime() - 24 * 60 * 60 * 1000
            )
        } else if (direction === 'next') {
            newDate = new Date(
                currentDate.getTime() + 24 * 60 * 60 * 1000
            )
        }

        setDatePicker(
            `${
                newDate.getDate()
            }/${
                newDate.getMonth() + 1
            }/${
                newDate.getFullYear()
            }`
        )
    }

    useEffect(() => {
        const datePickerInput = document.querySelector(
            '.realtime .navigation .date-picker-input'
        )

        datePickerInput.value = datePicker
    }, [datePicker])

    const formatDate = input =>
        input
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '$1/$2')
            .replace(/(\d{2})(\d)/, '$1/$2')
            .replace(/(\d{4})(\d)/, '$1')

    return <div className='realtime'>
        <div className='navigation'>
            <div
                className='prev-day'
                onClick={() => {changeDate('prev')}}
            >
                <FontAwesomeIcon
                    icon={faArrowLeft}
                />
            </div>
            <div
                className='next-day'
                onClick={() => {changeDate('next')}}
            >
                <FontAwesomeIcon
                    icon={faArrowRight}
                />
            </div>
            <form>
                <input
                    type='text'
                    className='date-picker-input'
                    onInput={event => {
                        event.target.value = formatDate(event.target.value)
                    }}
                />
                <button
                    className='date-picker-btn'
                    onClick={event => {
                        event.preventDefault()

                        const datePickerInput = document.querySelector(
                            '.realtime .navigation .date-picker-input'
                        )

                        setDatePicker(datePickerInput.value)
                    }}
                >
                    OK
                </button>
            </form>
        </div>
        {connected ?
            <h1 className='disconnected'>
                Desconectado
            </h1>
            :
            <div className='display'>
                <div className='value'
                    style={{
                        borderColor: themes.default.traceColors[0]
                    }}
                >
                    <FontAwesomeIcon
                        className='icon'
                        icon={faThermometerThreeQuarters}
                        style={{
                            color: themes.default.traceColors[0]
                        }}
                    />
                    <h1 className='text'>
                        T:
                    </h1>
                    <h1 className='payload'>
                        {t1} °C
                    </h1>
                </div>
                <div className='value'
                    style={{
                        borderColor: themes.default.traceColors[1]
                    }}
                >
                    <FontAwesomeIcon
                        className='icon'
                        icon={faTint}
                        style={{
                            color: themes.default.traceColors[1]
                        }}
                    />
                    <h1 className='text'>
                        HRA:
                    </h1>
                    <h1 className='payload'>
                        {h1} %
                    </h1>
                </div>
                <div className='value'
                    style={{
                        borderColor: themes.default.traceColors[2]
                    }}
                >
                    <FontAwesomeIcon
                        className='icon'
                        icon={faBolt}
                        style={{
                            color: themes.default.traceColors[2]
                        }}
                    />
                    <h1 className='text'>
                        Vca:
                    </h1>
                    <h1 className='payload'>
                        {v1} V
                    </h1>
                </div>
                <div className='value'
                    style={{
                        borderColor: themes.default.traceColors[3]
                    }}
                >
                    <FontAwesomeIcon
                        className='icon'
                        icon={faBolt}
                        style={{
                            color: themes.default.traceColors[3]
                        }}
                    />
                    <h1 className='text'>
                        Ica:
                    </h1>
                    <h1 className='payload'>
                        {i1} A
                    </h1>
                </div>
                <div className='value'
                    style={{
                        borderColor: themes.default.traceColors[4]
                    }}
                >
                    <FontAwesomeIcon
                        className='icon'
                        icon={faEllipsisH}
                        style={{
                            color: themes.default.traceColors[4]
                        }}
                    />
                    <h1 className='text'>
                        Vcc:
                    </h1>
                    <h1 className='payload'>
                        {v2} V
                    </h1>
                </div>
                <div className='value'
                    style={{
                        borderColor: themes.default.traceColors[5]
                    }}
                >
                    <FontAwesomeIcon
                        className='icon'
                        icon={faEllipsisH}
                        style={{
                            color: themes.default.traceColors[5]
                        }}
                    />
                    <h1 className='text'>
                        Icc:
                    </h1>
                    <h1 className='payload'>
                        {i2} A
                    </h1>
                </div>
                {/*<div className='value'
                    style={{
                        borderColor: themes.default.traceColors[6]
                    }}
                >
                    <FontAwesomeIcon
                        className='icon'
                        icon={faPlug}
                        style={{
                            color: themes.default.traceColors[6]
                        }}
                    />
                    <h1 className='text'>
                        Eca:
                    </h1>
                    <h1 className='payload'>
                        {energyValue.ac ?? ' -- '}
                    </h1>
                </div>
                <div className='value'
                    style={{
                        borderColor: themes.default.traceColors[7]
                    }}
                >
                    <FontAwesomeIcon
                        className='icon'
                        icon={faPlug}
                        style={{
                            color: themes.default.traceColors[7]
                        }}
                    />
                    <h1 className='text'>
                        Ecc:
                    </h1>
                    <h1 className='payload'>
                        {energyValue.dc ?? ' -- '}
                    </h1>
                </div>*/}
            </div>
        }
    </div>
}

export default RealTime