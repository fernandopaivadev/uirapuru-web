import React, { useState } from 'react'

import NewDevice from '../NewDevice/NewDevice'
import Modal from '../../blocks/Modal/Modal'

import api from '../../../services/api'

import styles from './deviceslist.style'
import util from '../../../util/util.style'

import { validateForm, formatDeviceID } from '../../../services/forms'

const DevicesList = ({ user, isAdmin, consumerUnitIndex }) => {
    const [numberOfDevices] = useState(user.consumerUnits[consumerUnitIndex]
        .devices.length)
    const [newDevicePopup, setNewDevicePopup] = useState(false)
    const [deviceIndex, setDeviceIndex] = useState()
    const [modal, setModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState('Ocorreu um erro')
    const [success, setSuccess] = useState(new Array(numberOfDevices).fill(false))
    const [error, setError] = useState(new Array(numberOfDevices).fill(false))

    const toggleSuccess = (index, value) => {
        const _success = success
        _success[index] = value
        setSuccess([..._success])
    }

    const toggleError = (index, value) => {
        const _error = error
        _error[index] = value
        setError([..._error])
    }

    const submit = async (index) => {
        const result = await api.updateUser(user)

        if (result === 'OK') {
            toggleSuccess(index, true)
            toggleError(index, false)

            setTimeout(() => {
                toggleSuccess(index, false)
            }, 2000)
        } else {
            setErrorMessage(result)
            toggleSuccess(index, false)
            toggleError(index, true)

            setTimeout(() => {
                toggleError(index, false)
            }, 2000)
        }
    }

    return user?.consumerUnits[consumerUnitIndex]?.devices ?
        <styles.devicesList>
            {newDevicePopup ?
                <NewDevice
                    user={user}
                    consumerUnitIndex={
                        consumerUnitIndex
                    }
                    exit={() => {
                        setNewDevicePopup(false)
                    }}
                />
                : null
            }

            {modal ?
                <Modal
                    message={'Você tem certeza?'}
                    taskOnYes={() => {
                        user
                            ?.consumerUnits[consumerUnitIndex]
                            .devices.pop(deviceIndex)
                        submit()
                        setModal(false)
                    }}
                    taskOnNo={() => {
                        setModal(false)
                    }}
                />
                : null
            }

            <styles.header>
                <styles.title
                    data-testid='title'
                >
                    Dispositivos
                </styles.title>

                {isAdmin ?
                    <util.classicButton
                        id='newDevice'
                        data-testid='newDevice'
                        onClick={event => {
                            event.preventDefault()
                            setNewDevicePopup(true)
                        }}
                    >
                        Novo dispositivo
                    </util.classicButton>
                    : null
                }
            </styles.header>

            <ul>{user?.consumerUnits[consumerUnitIndex]
                .devices.map((device, index) =>
                    <li key={index}>
                        <styles.deviceForm id={`deviceForm${index}`}>
                            <label
                                data-testid={`idLabel${index}`}
                            >
                                ID
                            </label>
                            <input
                                id={`deviceId${index}`}
                                data-testid={`deviceId${index}`}
                                defaultValue={device.id}
                                readOnly={!isAdmin}
                                maxLength='8'
                                minLength='8'
                                required
                                onChange={event => {
                                    user.consumerUnits[
                                        consumerUnitIndex
                                    ].devices[index].id = event.target.value
                                    event.target.value = formatDeviceID(
                                        event.target.value
                                    )
                                }}
                            />
                            <p className='error-message'>
                                ID inválido
                            </p>

                            <label
                                data-testid={`idName${index}`}
                            >
                                Nome
                            </label>
                            <input
                                id={`deviceName${index}`}
                                data-testid={`deviceName${index}`}
                                defaultValue={device.name}
                                readOnly={!isAdmin}
                                maxLength='20'
                                minLength='6'
                                required
                                onChange={event => {
                                    user.consumerUnits[
                                        consumerUnitIndex
                                    ].devices[index].name
                                    =
                                    event.target.value
                                }}
                            />
                            <p className='error-message'>
                                Digite no mínimo 6 caracteres
                            </p>

                            {isAdmin ?
                                <styles.buttons>
                                    <util.classicButton
                                        id={`saveDevicesList${index}`}
                                        data-testid={`saveDevicesList${index}`}
                                        onClick={event => {
                                            event.preventDefault()
                                            if (validateForm(`deviceForm${index}`)) {
                                                setDeviceIndex(index)
                                                submit(index)
                                            } else {
                                                setErrorMessage(
                                                    'Preencha todos os campos'
                                                )

                                                toggleError(index, true)

                                                setTimeout(() => {
                                                    toggleError(index, false)
                                                }, 3000)
                                            }
                                        }}
                                    >
                                        Salvar
                                    </util.classicButton>
                                    <util.criticalButton
                                        id={`deleteDevicesList${index}`}
                                        data-testid={`deleteDevicesList${index}`}
                                        onClick={event => {
                                            event.preventDefault()
                                            setDeviceIndex(index)
                                            setModal(true)
                                        }}
                                    >
                                        Excluir
                                    </util.criticalButton>
                                </styles.buttons>
                                : null
                            }

                            {success[index] && !error[index]?
                                <p
                                    id='successMessageDevicesList'
                                    className='success'>
                                    Salvo com sucesso!
                                </p>
                                : null
                            }

                            {!success[index] && error[index]?
                                <p
                                    id='errorMessageDevicesList'
                                    className='error'>
                                    {errorMessage}
                                </p>
                                : null
                            }
                        </styles.deviceForm>
                    </li>
                )
            }</ul>
        </styles.devicesList>
        : null
}

export default DevicesList
