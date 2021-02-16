import React, { useState, useEffect } from 'react'

import storage from '../../../services/storage'

import api from '../../../services/api'

import {
    formatDeviceID,
    validateForm,
    setFormsValidation
} from '../../../services/forms'

import styles from './newdevice.styles'
import util from '../../../util/util.style'

const NewDevice = ({ consumerUnitIndex, exit }) => {
    const [user, setUser] = useState({})
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState(
        'Erro no processamento do formulário'
    )

    const device = {
        id: '',
        name: ''
    }

    useEffect(() => {
        (async () => {
            setUser(await storage.read('user'))
        })()
    }, [])

    useEffect(() => {
        setFormsValidation()
    }, [])

    const submit = async () => {
        const result = await api.updateUser(user)

        if (result === 'OK') {
            setSuccess(true)
            setError(false)
            exit()
        } else if (result === 'ERROR') {
            setSuccess(false)
            setErrorMessage('Ocorreu um erro')
            setError(true)

            setTimeout(() => {
                setError(false)
            }, 3000)
        }
        exit()
    }

    return <styles.main>
        <styles.window>
            <styles.form id='newDeviceForm'>
                <styles.title>
                    Novo dispositivo
                </styles.title>

                <label>ID do dispositivo</label>
                <input
                    id='deviceId'
                    maxLength='8'
                    required
                    pattern='[A-Z0-9]{8}'
                    onChange={event => {
                        device.id = event.target.value
                        event.target.value = formatDeviceID(
                            event.target.value
                        )
                    }}
                />
                <p className='error-message'>
                    Digite no mínimo 8 caracteres
                </p>

                <label>Nome do dispositivo</label>
                <input
                    id='deviceName'
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

                <styles.buttons>
                    <util.classicButton
                        id='saveDevice'
                        onClick={event => {
                            event.preventDefault()
                            if (validateForm('newDeviceForm')) {
                                user.consumerUnits[consumerUnitIndex]
                                    .devices.push(device)
                                submit()
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
                    </util.classicButton>
                    <util.criticalButton
                        id='exit'
                        onClick={exit}
                    >
                        Cancelar
                    </util.criticalButton>
                </styles.buttons>
                {error && !success ?
                    <p
                        id='errorMessageDevice'
                        className='error'>
                        {errorMessage}
                    </p>
                    : null
                }
            </styles.form>
        </styles.window>
    </styles.main>
}

export default NewDevice
