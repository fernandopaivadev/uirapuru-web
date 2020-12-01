import React, { useState, useEffect } from 'react'

import NavBar from '../blocks/NavBar'

import Menu from '../blocks/Menu'

import Modal from '../blocks/Modal'

import NewDevice from '../blocks/NewDevice'

import storage from '../../services/storage'

import api from '../../services/api'

import UserForm from '../forms/UserForm'

import ConsumerUnitForm from '../forms/ConsumerUnitForm'

import {
    validateForm,
    setFormValidation
} from '../../services/forms'

import styles from '../../styles/profile'

import util from '../../styles/util'

const Profile = ({ history }) => {
    const admin = storage.read('access-level') === 'admin'
    const user = storage.read('user')

    const [consumerUnitIndex, setConsumerUnitIndex] = useState()
    const [deviceIndex, setDeviceIndex] = useState()
    const [modal, setModal] = useState([false,false])
    const [success, setSuccess] = useState([false,false])
    const [error, setError] = useState([false,false])
    const [errorMessage, setErrorMessage] = useState(
        'Ocorreu um erro'
    )
    const [newDevicePopup, setNewDevicePopup] = useState(false)

    useEffect(() => {
        if (consumerUnitIndex >= 0) {
            const len = storage.read('user')
                .consumerUnits[consumerUnitIndex]
                .devices
                .length + 2

            setSuccess(
                new Array(len).fill(false)
            )

            setError(
                new Array(len).fill(false)
            )

            for (let k = 0; k < len; k++) {
                setFormValidation(k)
            }
        } else {
            setFormValidation()
        }
    }, [consumerUnitIndex])

    const deleteUser = async () => {
        const result = await api.deleteUser(storage.read('user')._id)

        if (result === 'OK') {
            history.push('/users-list')
        } else {
            storage.clear('all')
            history.push('/login')
        }
    }

    const submit = async index => {
        const result = await api.updateUser(user)

        if (result === 'OK') {
            const _success = [...success]
            _success[index] = true
            setSuccess(_success)

            const _error = [...error]
            _error[index] = false
            setError(_error)

            setTimeout(() => {
                const _success = [...success]
                _success[index] = false
                setSuccess(_success)
            }, 2000)
        } else {
            setErrorMessage(result)

            const _success = [...success]
            _success[index] = false
            setSuccess(_success)

            const _error = [...error]
            _error[index] = true
            setError(_error)

            setTimeout(() => {
                const _error = [...error]
                _error[index] = false
                setError(_error)
            }, 2000)
        }
    }

    return <div className='profile'>
        <NavBar />

        { newDevicePopup ?
            <NewDevice
                consumerUnitIndex={consumerUnitIndex}
                exit={() => {
                    setNewDevicePopup(false)
                }}
            />
            : null
        }

        { modal[0] ?
            <Modal
                message={'Você tem certeza?'}
                taskOnYes={() => {
                    deleteUser()
                }}
                taskOnNo={() => {
                    setModal(false)
                }}
            />
            : null
        }

        { modal[1] ?
            <Modal
                message={'Você tem certeza?'}
                taskOnYes={() => {
                    user.consumerUnits.pop(consumerUnitIndex)
                    submit(1)
                    setModal([false, false, false])
                }}
                taskOnNo={() => {
                    setModal([false, false, false])
                }}
            />
            : null
        }

        { modal[2] ?
            <Modal
                message={'Você tem certeza?'}
                taskOnYes={() => {
                    user
                        .consumerUnits[consumerUnitIndex]
                        .devices.pop(deviceIndex)
                    submit(1)
                    setModal([false, false, false])
                }}
                taskOnNo={() => {
                    setModal([false, false, false])
                }}
            />
            : null
        }

        <styles.main>
            <Menu
                title='Unidades'
                items={storage.read('user').consumerUnits}
                setItemIndex={ setConsumerUnitIndex }
                subItemKey='devices'
            />

            <styles.formContainer>
                <UserForm
                    user={storage.read('user')}
                />
                {admin ?
                    <util.classicButton
                        onClick={event => {
                            event.preventDefault()
                            if (validateForm(0)) {
                                submit(0)
                            } else {
                                setErrorMessage('Preencha todos os campos')
                                const _error = [...error]
                                _error[0] = true
                                setError(_error)

                                setTimeout(() => {
                                    const _error = [...error]
                                    _error[0] = false
                                    setError(_error)
                                }, 3000)
                            }
                        }}
                    >
                        Salvar
                    </util.classicButton>
                    : null
                }
                {success[0] && !error[0]?
                    <p className='success'>
                            Salvo com sucesso!
                    </p>
                    : null
                }
                {!success[0] && error[0]?
                    <p className='error'>
                        { errorMessage }
                    </p>
                    : null
                }
            </styles.formContainer>

            <styles.formContainer>
                {consumerUnitIndex >= 0 ?
                    <>
                        <ConsumerUnitForm
                            user={storage.read('user')}
                            consumerUnitIndex={consumerUnitIndex}
                            isAdmin={admin}
                        />
                        <styles.buttons>
                            {admin ?
                                <util.criticalButton
                                    onClick={ event => {
                                        event.preventDefault()
                                        setModal([false, true, false])
                                    }}
                                >
                                Excluir Unidade
                                </util.criticalButton>
                                : null
                            }
                            {admin ?
                                <util.classicButton
                                    onClick = { () => {
                                        history.push('/new-unit')
                                    }}
                                >
                                Nova Unidade
                                </util.classicButton>
                                : null
                            }
                            {admin ?
                                <util.classicButton
                                    onClick={ event => {
                                        event.preventDefault()
                                        if (validateForm(1)) {
                                            submit(1)
                                        } else {
                                            setErrorMessage('Preencha todos os campos')
                                            const _error = [...error]
                                            _error[1] = true
                                            setError(_error)

                                            setTimeout(() => {
                                                const _error = [...error]
                                                _error[1] = false
                                                setError(_error)
                                            }, 3000)
                                        }
                                    }}
                                >
                                    Salvar
                                </util.classicButton>
                                : null
                            }
                        </styles.buttons>
                    </>
                    :
                    <styles.empty>
                        <p>
                            Escolha uma unidade Consumidora
                        </p>
                        {admin ?
                            <util.classicButton
                                onClick = { () => {
                                    history.push('/new-unit')
                                }}
                            >
                                Nova Unidade
                            </util.classicButton>
                            : null
                        }
                    </styles.empty>
                }

                {success[1] && !error[1]?
                    <p className='success'>
                        Salvo com sucesso!
                    </p>
                    : null
                }
                {!success[1] && error[1]?
                    <p className='error'>
                        { errorMessage }
                    </p>
                    : null
                }
            </styles.formContainer>

            {storage.read('user').consumerUnits[consumerUnitIndex] ?
                <styles.devicesList>
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
                        {storage.read('user')
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
                :
                <styles.empty>
                    <p>
                        Sem dispositivos
                    </p>
                </styles.empty>
            }
        </styles.main>

        <styles.navButtons>
            <util.classicButton
                onClick={() =>{
                    history.push('/dashboard')
                }}
            >
                    Dashboard
            </util.classicButton>
            {admin ?
                <util.criticalButton
                    onClick={ () => {
                        setModal([true, false, false])
                    }}
                >
                    Excluir Usuário
                </util.criticalButton>
                : null
            }
        </styles.navButtons>
    </div>
}

export default Profile
