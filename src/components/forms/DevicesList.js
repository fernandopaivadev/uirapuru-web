import React, { useState, useEffect } from 'react'

import NewDevice from '../forms/NewDevice'
import Modal from '../blocks/Modal/Modal'

import api from '../../services/api'
import storage from '../../services/storage'

import styles from '../../styles/deviceslist'
import util from '../../styles/util'

import { validateForm, formatDeviceID } from '../../services/forms'

const DevicesList = ({ consumerUnitIndex }) => {
    const [user, setUser] = useState({})
    const [isAdmin, setIsAdmin] = useState(false)
    const [numberOfDevices, setNumberOfDevices] = useState(0)
    const [newDevicePopup, setNewDevicePopup] = useState(false)
    const [deviceIndex, setDeviceIndex] = useState()
    const [modal, setModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState('Ocorreu um erro')
    const [success, setSuccess] = useState(new Array(numberOfDevices).fill(false))
    const [error, setError] = useState(new Array(numberOfDevices).fill(false))

    useEffect(() => {
        (async () => {
            const _user = await storage.read('user')
            setUser(_user)
            setIsAdmin(await storage.read('access-level') === 'admin')
            setNumberOfDevices(
                _user.consumerUnits[consumerUnitIndex]
                    .devices.length)
        })()
    }, [])

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

    return user?.consumerUnits ?
        <styles.devicesList>
            {newDevicePopup ?
                <NewDevice
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
                <styles.title>
                Dispositivos
                </styles.title>

                {isAdmin ?
                    <util.classicButton
                        id='newDevice'
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

            <ul>{user
                ?.consumerUnits[consumerUnitIndex]
                .devices.map((device, index) =>
                    <li key={index}>
                        <styles.deviceForm id={`deviceForm${index}`}>
                            <label>
                            ID
                            </label>
                            <input
                                id={`deviceId${index}`}
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

                            <label>
                            Nome
                            </label>
                            <input
                                id={`deviceName${index}`}
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
