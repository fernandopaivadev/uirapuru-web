import React from 'react'

import NewDevice from '../blocks/NewDevice'

import styles from '../../styles/deviceform'
import util from '../../styles/util'

const DevicesList = ({
    user,
    consumerUnitIndex,
    isAdmin,
    setNewDevicePopup,
    setDeviceIndex,
    submit,
    setModal,
    success,
    error,
    errorMessage
}) => {

    return <styles.devicesList>
        <NewDevice />

        <styles.header>
            <styles.title>Dispositivos</styles.title>
            {isAdmin ?
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
                                readOnly={!isAdmin}
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
                                readOnly={!isAdmin}
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
                            {isAdmin ?
                                <styles.buttons>
                                    <util.classicButton
                                        onClick={event => {
                                            event.preventDefault()
                                            setDeviceIndex(index)
                                            submit(index + 2)
                                        }}
                                    >
                                                Salvar
                                    </util.classicButton>
                                    <util.criticalButton
                                        onClick={event => {
                                            event.preventDefault()
                                            setDeviceIndex(index)
                                            setModal([
                                                false,
                                                false,
                                                true
                                            ])
                                        }}
                                    >
                                                Excluir
                                    </util.criticalButton>
                                </styles.buttons>
                                : null
                            }
                            {success[index + 2] && !error[index + 2]?
                                <p className='success'>
                                    Salvo com sucesso!
                                </p>
                                : null
                            }
                            {!success[index + 2] && error[index + 2]?
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
