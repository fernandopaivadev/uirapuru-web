import React, { useState } from 'react'

import NewDevice from '../blocks/NewDevice'

import Modal from '../blocks/Modal'

import api from '../../services/api'

import storage from '../../services/storage'

import styles from '../../styles/deviceform'
import util from '../../styles/util'

const DevicesList = ({ consumerUnitIndex }) => {
    const [newDevicePopup, setNewDevicePopup] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [deviceIndex, setDeviceIndex] = useState()
    const [modal, setModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState(
        'Ocorreu um erro'
    )

    const user = storage.read('user')
    const admin = storage.read('access-level') === 'admin'

    const submit = async () => {
        const result = await api.updateUser(user)

        if (result === 'OK') {
            setSuccess(true)
            setError(false)

            setTimeout(() => {
                setSuccess(false)
            }, 2000)
        } else {
            setErrorMessage(result)
            setSuccess(false)
            setError(true)

            setTimeout(() => {
                setError(false)
            }, 2000)
        }
    }

    return <styles.devicesList>
        {newDevicePopup ?
            <NewDevice
                exit={() => {
                    setNewDevicePopup(false)
                }}
            />
            : null
        }

        { modal ?
            <Modal
                message={'Você tem certeza?'}
                taskOnYes={() => {
                    user
                        .consumerUnits[consumerUnitIndex]
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
            <styles.title>Dispositivos</styles.title>
            {admin ?
                <util.classicButton
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
        <ul>
            {user
                .consumerUnits[consumerUnitIndex]
                .devices.map((device, index) =>
                    <li key={index}>
                        <styles.devicesForm>
                            <label>
                                ID
                            </label>
                            <input
                                defaultValue={device.id}
                                readOnly={!admin}
                                maxLength='8'
                                minLength='8'
                                onChange={ event => {
                                    user
                                        .consumerUnits[
                                            consumerUnitIndex
                                        ]
                                        .devices[index].id
                                                    =
                                                    event.target.value
                                }}
                            />
                            <p className='error-message'>
                                ID inválido
                            </p>
                            <label>
                                Nome
                            </label>
                            <input
                                defaultValue={device.name}
                                readOnly={!admin}
                                maxLength='20'
                                minLength='6'
                                onChange={ event => {
                                    user
                                        .consumerUnits[
                                            consumerUnitIndex
                                        ]
                                        .devices[index].name
                                                    =
                                            event.target.value
                                }}
                            />
                            <p className='error-message'>
                                            Digite no mínimo 6 caracteres
                            </p>
                            {admin ?
                                <styles.buttons>
                                    <util.classicButton
                                        onClick={event => {
                                            event.preventDefault()
                                            setDeviceIndex(index)
                                            submit()
                                        }}
                                    >
                                        Salvar
                                    </util.classicButton>
                                    <util.criticalButton
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
                            {success && !error?
                                <p className='success'>
                                    Salvo com sucesso!
                                </p>
                                : null
                            }
                            {!success && error?
                                <p className='error'>
                                    { errorMessage }
                                </p>
                                : null
                            }
                        </styles.devicesForm>
                    </li>
                )
            }
        </ul>
    </styles.devicesList>
}

export default DevicesList
