import React, { useState, useEffect } from 'react'

import NavBar from '../blocks/NavBar'

import Menu from '../blocks/Menu'

import Modal from '../blocks/Modal'

import NewDevice from '../blocks/NewDevice'

import storage from '../../services/storage'

import api from '../../services/api'

import UserForm from '../forms/UserForm'

import {
    formatCEP,
    getOnlyNumbers,
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
                    :
                    <styles.empty>
                        <p>
                            Nenhum usuário encontrado.
                        </p>
                    </styles.empty>
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

            {storage.read('user').consumerUnits[ consumerUnitIndex ] ?
                <styles.form>
                    <styles.title>
                        Dados da Unidade Consumidora
                    </styles.title>
                    <label>Número</label>
                    <input
                        name='number'
                        minLength='6'
                        maxLength='16'
                        required
                        defaultValue={storage.read('user')
                            .consumerUnits[ consumerUnitIndex ]
                            ?.number ?? ''}
                        readOnly= {!admin}
                        onChange={ event => {
                            user.consumerUnits[ consumerUnitIndex]
                                .number = event.target.value
                        }}
                    />
                    <p className='error-message'>
                        Digite no mínimo 6 caracteres
                    </p>

                    <label>Nome da unidade consumidora</label>
                    <input
                        name='name'
                        maxLength='64'
                        minLength='8'
                        required
                        defaultValue={storage.read('user')
                            .consumerUnits[ consumerUnitIndex ]
                            ?.name ?? ''}
                        readOnly= {!admin}
                        onChange={ event => {
                            user.consumerUnits[ consumerUnitIndex]
                                .name = event.target.value
                        }}
                    />
                    <p className='error-message'>
                            Digite no mínimo 8 caracteres
                    </p>

                    <label>Endereço</label>
                    <input
                        name='address'
                        maxLength='256'
                        minLength='10'
                        required
                        defaultValue={storage.read('user')
                            .consumerUnits[ consumerUnitIndex ]
                            ?.address ?? ''}
                        readOnly= {!admin}
                        onChange={ event => {
                            user.consumerUnits[ consumerUnitIndex]
                                .address = event.target.value
                        }}
                    />
                    <p className='error-message'>
                        Digite no mínimo 10 caracteres
                    </p>

                    <label>CEP</label>
                    <input
                        name='zip'
                        required
                        pattern='\d{5}-\d{3}'
                        defaultValue={formatCEP(storage.read('user')
                            .consumerUnits[ consumerUnitIndex ]?.zip) ?? ''}
                        readOnly= {!admin}
                        onChange={ event => {
                            user
                                .consumerUnits[ consumerUnitIndex]
                                .zip = getOnlyNumbers(event.target.value)
                            event.target.value =  formatCEP(event.target
                                .value)
                        }}
                    />
                    <p className='error-message'>
                        CEP inválido
                    </p>

                    <label>Cidade</label>
                    <input
                        name='city'
                        maxLength='64'
                        minLength='3'
                        required
                        defaultValue={storage.read('user')
                            .consumerUnits[ consumerUnitIndex ]
                            ?.city ?? ''}
                        readOnly= {!admin}
                        onChange={ event => {
                            user.consumerUnits[ consumerUnitIndex]
                                .city = event.target.value
                        }}
                    />
                    <p className='error-message'>
                        Digite no mínimo 3 caracteres
                    </p>

                    <label>Estado</label>
                    <input
                        name='state'
                        maxLength='64'
                        minLength='3'
                        required
                        defaultValue={storage.read('user')
                            .consumerUnits[ consumerUnitIndex ]
                            ?.state ?? ''}
                        readOnly= {!admin}
                        onChange={ event => {
                            user.consumerUnits[ consumerUnitIndex]
                                .state = event.target.value
                        }}
                    />
                    <p className='error-message'>
                        Digite no mínimo 3 caracteres
                    </p>

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
                </styles.form>
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
