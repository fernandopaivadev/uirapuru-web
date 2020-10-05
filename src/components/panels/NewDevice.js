import React, { useState, useEffect } from 'react'

import { getData, storeData } from '../../services/storage'

import { api } from '../../services/api'

import {
    formatDeviceID,
    validateForm,
    setFormValidation
} from '../../services/forms'

import '../../styles/newdevice.css'

const NewUnit = ({ consumerUnitIndex, exit }) => {
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState(
        'Erro no processamento do formulário'
    )
    const user = getData('user')
    const device = {
        id: '',
        name: ''
    }

    useEffect(() => {
        setFormValidation()
    })

    const handleSubmit = async () => {
        try {
            storeData('user', user)

            const response = await api.put('/user/update', user)

            const status = response?.status

            if (status === 200) {
                setSuccess(true)
                setError(false)

                exit()
            } else {
                setSuccess(false)
                setError(true)

                setTimeout(() => {
                    setError(false)
                }, 3000)
            }
        } catch (err) {
            console.log(err?.message ?? err?.response?.data?.message)

            const status = err?.response?.status

            if (status) {
                setErrorMessage('Erro no processamento do formulário')

                setSuccess(false)
                setError(true)
            }
        }
    }

    return <div className='newdevice'>
        <div className='window'>
            <form>
                <h1>Novo dispositivo</h1>
                <label>ID do dispositivo</label>
                <input
                    maxLength='10'
                    minLength='6'
                    required
                    onChange={event => {
                        device.id = event.target.value
                        event.target.value = formatDeviceID(
                            event.target.value
                        )
                    }}
                />
                <p className='error-message'>
                    Digite no mínimo 6 caracteres
                </p>

                <label>Nome do dispositivo</label>
                <input
                    maxLength='20'
                    minLength='6'
                    required
                    onChange={event => {
                        device.name = event.target.value
                    }}
                />
                <p className='error-message'>
                    Digite no mínimo 6 caracteres
                </p>

                <div className='buttons'>
                    <button
                        className='classic-button'
                        onClick={event => {
                            event.preventDefault()
                            if (validateForm()) {
                                user
                                    .consumerUnits[consumerUnitIndex]
                                    .devices.push(device)
                                handleSubmit()
                            } else {
                                setErrorMessage(
                                    'Preencha os campos corretamente'
                                )
                                setSuccess(false)
                                setError(true)

                                setTimeout(() => {
                                    setError(false)
                                }, 1500)
                            }
                        }}
                    >
                        Salvar
                    </button>
                    <button
                        className='classic-button'
                        id='cancel-button'
                        onClick={exit}
                    >
                        Cancelar
                    </button>
                </div>
                {error && !success ?
                    <p className='error'>
                        { errorMessage }
                    </p>
                    : null
                }
            </form>
        </div>
    </div>
}

export default NewUnit