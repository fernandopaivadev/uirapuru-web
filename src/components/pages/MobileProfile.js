import React, { useState, useEffect } from 'react'

import NavBar from '../panels/NavBar'

import Menu from '../panels/Menu'

import Modal from '../panels/Modal'

import NewDevice from '../panels/NewDevice'

import { getData , clearData, storeData } from '../../services/storage'

import MenuIcon from '@material-ui/icons/Menu'

import { isAdmin, logout } from '../../services/auth'

import { api } from '../../services/api'

import fetch from '../../services/fetch'

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

import '../../styles/mobileprofile.css'

import '../../styles/util.css'

const MobileProfile = ({ history }) => {
    const admin = isAdmin()
    const user = getData('user')
    const [consumerUnitIndex, setConsumerUnitIndex] = useState()
    const [deviceIndex, setDeviceIndex] = useState()
    const [modal, setModal] = useState([false,false])
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState(
        'Erro no processamento do formulário'
    )
    const [newDevicePopup, setNewDevicePopup] = useState(false)

    useEffect(() => {
        if (consumerUnitIndex) {
            const len = getData('user')
                .consumerUnits[consumerUnitIndex]
                .devices
                .length + 2

            for (let k = 0; k < len; k++) {
                setFormValidation(k)
            }
        } else {
            setFormValidation()
        }
    }, [consumerUnitIndex])

    useEffect(() => {
        if (consumerUnitIndex >= 0) {
            const len = getData('user')
                .consumerUnits[consumerUnitIndex]
                .devices
                .length + 2
            setSuccess(
                new Array(len).fill(false)
            )
            setError(
                new Array(len).fill(false)
            )
        }
    }, [consumerUnitIndex])

    const deleteUser = async () => {
        try {
            const response = await api.delete(
                `/user/remove?_id=${getData('user')._id}`
            )

            const status = response?.status

            if(status === 200) {
                clearData('user')
                clearData('users-list')

                if (await fetch()) {
                    history.push('/users-list')
                } else {
                    logout()
                    history.push('/login')
                }
            }

        } catch (err) {
            console.log(err?.message ?? err?.response?.data?.message)
        }
    }

    const handleSubmit = async (index) => {
        try {
            storeData('user', user)

            const response = await api.put('/user/update', user)

            const status = response?.status

            if (status === 200) {
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
                }, 1500)
            } else {
                setErrorMessage('Erro no processamento do formulário')

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
                }, 1500)
            }
        } catch (err) {
            console.log(err?.message ?? err?.response?.data?.message)

            const status = err?.response?.status

            if (status) {
                setErrorMessage('Erro no processamento do formulário')

                const _error = [...error]
                _error[index] = true
                setError(_error)
            }
        }
    }

    const toggleMenu = () => {
        const menu = document.querySelector('.mobileprofile .main .menu')

        if (
            menu.style.visibility === 'hidden'
            ||
            menu.style.visibility === ''
        ) {
            menu.style.visibility = 'visible'
        } else if (menu.style.visibility === 'visible') {
            menu.style.visibility = 'hidden'
        }
    }

    return <div className='mobileprofile'>
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
                    handleSubmit(1)
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
                    handleSubmit(1)
                    setModal([false, false, false])
                }}
                taskOnNo={() => {
                    setModal([false, false, false])
                }}
            />
            : null
        }

        <div className='main'>
            <button
                className='button-menu-icon'
                onClick={() => {
                    toggleMenu()
                }}
            >
                <MenuIcon className='menu-icon' />
            </button>
            <Menu
                className='menu'
                title='Unidades'
                items = {getData('user').consumerUnits}
                setItemIndex = {consumerUnitIndex => {
                    toggleMenu()
                    setConsumerUnitIndex(consumerUnitIndex)
                }}
                subItemKey='devices'
            />
            {getData('user') ?
                <form>
                    <h1>
                        Dados do Usuário
                    </h1>
                    <label>Nome de Usuário</label>
                    <input
                        name='username'
                        maxLength='20'
                        minLength='6'
                        required
                        defaultValue={getData('user')?.username ?? ''}
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

                    <label>
                        Email
                    </label>
                    <input
                        name='email'
                        maxLength='40'
                        minLength='10'
                        required
                        defaultValue={getData('user')?.email ?? ''}
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
                        defaultValue={formatPhone(getData('user')?.phone) ?? ''}
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
                    {getData('user')?.person ?
                        <>
                            <label>Nome completo</label>
                            <input
                                name='name'
                                maxLength='128'
                                minLength='10'
                                required
                                defaultValue={getData('user')?.person
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
                                defaultValue={formatCPF(getData('user')?.person
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
                                    getData('user')?.person?.birth
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
                                        getData('user')?.company?.cnpj
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
                                defaultValue={getData('user')?.company
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

                            <label>Razão Social</label>
                            <input
                                name='tradeName'
                                maxLength='128'
                                minLength='6'
                                required
                                defaultValue={getData('user')?.company
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
                                defaultValue={getData('user')?.company
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
                                    handleSubmit(0)
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

            {getData('user').consumerUnits[ consumerUnitIndex ] ?
                <form>
                    <h1>
                        Dados da Unidade Consumidora
                    </h1>
                    <label>Número</label>
                    <input
                        name='number'
                        minLength='6'
                        maxLength='16'
                        required
                        defaultValue={getData('user')
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
                        defaultValue={getData('user')
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
                        defaultValue={getData('user')
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
                        defaultValue={formatCEP(getData('user')
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
                        defaultValue={getData('user')
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
                        defaultValue={getData('user')
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
                                Excluir U.C.
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
                                    Cadastrar U.C.
                            </button>
                            : null
                        }
                        {admin ?
                            <button
                                className='classic-button'
                                onClick={ event => {
                                    event.preventDefault()
                                    if (validateForm(1)) {
                                        handleSubmit(1)
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
                                Cadastrar U.C.
                        </button>
                        : null
                    }
                </div>
            }
            {getData('user').consumerUnits[ consumerUnitIndex ] ?
                <div className='devices-list'>
                    <h1>
                            Dispositivos
                    </h1>
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
                    <ul>
                        {getData('user')
                            .consumerUnits[ consumerUnitIndex ]
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
                                                        handleSubmit(index + 2)
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
                                                        setModal(
                                                            [false, false, true]
                                                        )
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
    </div>
}

export default MobileProfile