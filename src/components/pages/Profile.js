import React, { useState, useEffect } from 'react'

import NavBar from '../panels/NavBar'

import Menu from '../panels/Menu'

import Modal from '../panels/Modal'

import NewDevice from '../panels/NewDevice'

import storage from '../../services/storage'

import api from '../../services/api'

import {
    formatUsername,
    formatPhone,
    formatCPF,
    formatCNPJ,
    formatCEP,
    formatTimeStamp,
    formatDate,
    getOnlyNumbers,
    validateForm,
    setFormValidation
} from '../../services/forms'

import '../../styles/profile.css'

import '../../styles/util.css'

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

        <div className='main'>
            <Menu
                title='Unidades'
                items={storage.read('user').consumerUnits}
                setItemIndex={ setConsumerUnitIndex }
                subItemKey='devices'
            />
            {storage.read('user') ?
                <form className='user-data'>
                    <h1>
                        Dados do Usuário
                    </h1>
                    <label>Nome de usuário</label>
                    <input
                        name='username'
                        maxLength='20'
                        minLength='6'
                        required
                        defaultValue={storage.read('user')?.username ?? ''}
                        readOnly= {!admin}
                        onChange={ event => {
                            user.username = event.target.value
                            event.target.value = formatUsername(
                                event.target.value
                            )
                        }}
                    />
                    <p className='error-message'>
                        Digite no mínimo 6 caracteres
                    </p>

                    <label>Email</label>
                    <input
                        name='email'
                        maxLength='40'
                        minLength='10'
                        required
                        defaultValue={storage.read('user')?.email ?? ''}
                        readOnly= {!admin}
                        onChange={ event => {
                            user.email = event.target.value
                        }}
                    />
                    <p className='error-message'>
                        Digite no mínimo 10 caracteres
                    </p>

                    <label>Telefone</label>
                    <input
                        name='phone'
                        required
                        pattern='\(\d{2}\) \d{5}-\d{4}$'
                        defaultValue={formatPhone(storage.read('user')?.phone) ?? ''}
                        readOnly= {!admin}
                        onChange={ event => {
                            user.phone = getOnlyNumbers(event.target.value)
                            event.target.value =  formatPhone(
                                event.target.value
                            )
                        }}
                    />
                    <p className='error-message'>
                        Número de telefone inválido
                    </p>

                    {storage.read('user')?.person ?
                        <>
                            <label>Nome completo</label>
                            <input
                                name='name'
                                maxLength='128'
                                minLength='10'
                                required
                                defaultValue={storage.read('user')?.person
                                    ?.name ?? ''}
                                readOnly= {!admin}
                                onChange={ event => {
                                    user.person.name = event.target.value
                                }}
                            />
                            <p className='error-message'>
                                Digite no mínimo 10 caracteres
                            </p>

                            <label>CPF</label>
                            <input
                                name='cpf'
                                required
                                pattern='\d{3}\.\d{3}\.\d{3}-\d{2}'
                                defaultValue={formatCPF(storage.read('user')?.person
                                    ?.cpf) ?? ''}
                                readOnly= {!admin}
                                onChange={ event => {
                                    user.person.cpf = getOnlyNumbers(
                                        event.target.value
                                    )
                                    event.target.value =  formatCPF(
                                        event.target.value
                                    )
                                }}
                            />
                            <p className='error-message'>
                                CPF inválido
                            </p>

                            <label>Data de nascimento</label>
                            <input
                                name='birth'
                                required
                                pattern='\d{2}\/\d{2}\/\d{4}'
                                defaultValue={formatTimeStamp(
                                    storage.read('user')?.person?.birth
                                ) ?? ''}
                                readOnly= {!admin}
                                onChange={ event => {
                                    user.person.birth = event.target.value
                                    event.target.value = formatDate(
                                        event.target.value
                                    )
                                }}
                            />
                            <p className='error-message'>
                                Data inválida
                            </p>
                        </>
                        :
                        <>
                            <label>CNPJ</label>
                            <input
                                name='cnpj'
                                required
                                pattern='\d{2}\.\d{3}\.\d{3}.\d{4}-\d{2}'
                                defaultValue={
                                    formatCNPJ(
                                        storage.read('user')?.company?.cnpj
                                    ) ?? '--'
                                }
                                readOnly= {!admin}
                                onChange={ event => {
                                    user.company.cnpj = getOnlyNumbers(
                                        event.target.value
                                    )
                                    user.phone = event.target.value
                                    event.target.value =  formatCNPJ(
                                        event.target.value
                                    )
                                }}
                            />
                            <p className='error-message'>
                                CNPJ inválido
                            </p>

                            <label>Nome Fantasia</label>
                            <input
                                name='name'
                                maxLength='128'
                                minLength='6'
                                required
                                defaultValue={storage.read('user')?.company
                                    ?.name ?? ''}
                                readOnly= {!admin}
                                onChange={ event => {
                                    user.company.name = event
                                        .target
                                        .value
                                }}
                            />
                            <p className='error-message'>
                                Digite no mínimo 6 caracteres
                            </p>

                            <label>Razão social</label>
                            <input
                                name='tradeName'
                                maxLength='128'
                                minLength='6'
                                required
                                defaultValue={storage.read('user')?.company
                                    ?.tradeName ?? ''}
                                readOnly= {!admin}
                                onChange={ event => {
                                    user.company.tradeName = event
                                        .target
                                        .value
                                }}
                            />
                            <p className='error-message'>
                                    Digite no mínimo 6 caracteres
                            </p>

                            <label>Descrição</label>
                            <input
                                name='description'
                                maxLength='512'
                                minLength='50'
                                required
                                defaultValue={storage.read('user')?.company
                                    ?.description ?? ''}
                                readOnly= {!admin}
                                onChange={ event => {
                                    user.company.description = event
                                        .target
                                        .value
                                }}
                            />
                            <p className='error-message'>
                                    Digite no mínimo 50 caracteres
                            </p>
                        </>
                    }
                    {admin ?
                        <button
                            className='classic-button'
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
                        </button>
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
                </form>
                : null
            }

            {storage.read('user').consumerUnits[ consumerUnitIndex ] ?
                <form className='consumer-unit-data'>
                    <h1>
                        Dados da Unidade Consumidora
                    </h1>
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

                    <div className='buttons'>
                        {admin ?
                            <button
                                id='delete-button'
                                className='classic-button'
                                onClick={ event => {
                                    event.preventDefault()
                                    setModal([false, true, false])
                                }}
                            >
                                Excluir Unidade
                            </button>
                            : null
                        }
                        {admin ?
                            <button
                                className='classic-button'
                                onClick = { () => {
                                    history.push('/new-unit')
                                }}
                            >
                                Nova Unidade
                            </button>
                            : null
                        }
                        {admin ?
                            <button
                                className='classic-button'
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
                            </button>
                            : null
                        }
                    </div>

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
                </form>
                :
                <div className='empty'>
                    <p>
                        Escolha uma unidade Consumidora
                    </p>
                    {admin ?
                        <button
                            className='classic-button'
                            onClick = { () => {
                                history.push('/new-unit')
                            }}
                        >
                            Nova Unidade
                        </button>
                        : null
                    }
                </div>
            }
            {storage.read('user').consumerUnits[consumerUnitIndex] ?
                <div className='devices-list'>
                    <div className='header'>
                        <h1>Dispositivos</h1>
                        {admin ?
                            <button
                                className='classic-button'
                                onClick={event => {
                                    event.preventDefault()
                                    setNewDevicePopup(true)
                                }}
                            >
                                Novo dispositivo
                            </button>
                            : null
                        }
                    </div>
                    <ul>
                        {storage.read('user')
                            .consumerUnits[consumerUnitIndex]
                            .devices.map((device, index) =>
                                <li key={index}>
                                    <form>
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
                                            <div className='buttons'>
                                                <button
                                                    className='classic-button'
                                                    onClick={event => {
                                                        event.preventDefault()
                                                        setDeviceIndex(index)
                                                        submit(index + 2)
                                                    }}
                                                >
                                                Salvar
                                                </button>
                                                <button
                                                    className='classic-button'
                                                    id='delete-button'
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
                                                </button>
                                            </div>
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
                                    </form>
                                </li>
                            )
                        }
                    </ul>
                </div>
                :
                <div className='empty'>
                    <p>
                        Sem dispositivos
                    </p>
                </div>
            }
        </div>

        <div className='nav-buttons'>
            <button
                className='classic-button'
                onClick={() =>{
                    history.push('/dashboard')
                }}
            >
                    Dashboard
            </button>
            {admin ?
                <button
                    id='delete-button'
                    className='classic-button'
                    onClick={ () => {
                        setModal([true, false, false])
                    }}
                >
                    Excluir Usuário
                </button>
                : null
            }
        </div>
    </div>
}

export default Profile
