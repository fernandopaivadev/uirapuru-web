import React, { useState, useEffect } from 'react'

import storage from '../../services/storage'

import api from '../../services/api'

import {
    formatDeviceID,
    validateForm,
    setFormsValidation
} from '../../services/forms'

import styles from '../../styles/newdevice'
import util from '../../styles/util'

const NewDevice = ({ consumerUnitIndex, exit }) => {
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState(
        'Erro no processamento do formulário'
    )

    const user = storage.read('user')
    const device = {
        id: '',
        name: ''
    }

    useEffect(() => {
        setFormsValidation()
    })

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
            <styles.form>
                <styles.title>Novo dispositivo</styles.title>
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

                <styles.buttons>
                    <util.classicButton
                        onClick={event => {
                            event.preventDefault()
                            if (validateForm()) {
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
                        onClick={exit}
                    >
                        Cancelar
                    </util.criticalButton>
                </styles.buttons>
                {error && !success ?
                    <p className='error'>
                        { errorMessage }
                    </p>
                    : null
                }
            </styles.form>
        </styles.window>
    </styles.main>
}

export default NewDevice
