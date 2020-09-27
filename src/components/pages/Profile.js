import React, { useState } from 'react'

import NavBar from '../panels/NavBar'

import Menu from '../panels/Menu'

import Modal from '../panels/Modal'

import { getData, clearData, storeData } from '../../services/storage'

import { isAdmin, logout } from '../../services/auth'

import { api } from '../../services/api'

import fetch from '../../services/fetch'

import {
    formatPhone,
    formatCPF,
    formatCNPJ,
    formatCEP,
    formatTimeStamp,
    formatDate,
    getOnlyNumbers,
    validateForm
} from '../../services/util'

import '../../styles/profile.css'

import '../../styles/util.css'

const Profile = ({ history }) => {
    const admin = isAdmin()
    const user = getData('user')
    const [consumerUnitIndex, setConsumerUnitIndex] = useState()
    const [modal, setModal] = useState([false,false])
    const [success, setSuccess] = useState([false, false])
    const [error, setError] = useState([false, false])

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
            console.log(
                err?.message ?? err?.response?.data?.message
            )
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

                setTimeout(() => {
                    const _success = [...success]
                    _success[index] = false
                    setSuccess(_success)
                }, 1500)
            } else {
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
                const _error = [...error]
                _error[index] = true
                setError(_error)
            }
        }
    }

    return <div className='profile'>
        <NavBar />
        <Menu
            items = {getData('user').consumerUnits}
            setItemIndex = { setConsumerUnitIndex }
        />

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
                    setModal(false)
                }}
                taskOnNo={() => {
                    setModal(false)
                }}
            />
            : null
        }

        <div className='main'>
            <div className='forms'>
                {getData('user') ?
                    <form>
                        <h1>
                            Dados do Usuário
                        </h1>
                        <label>Nome de usuário</label>
                        <input
                            name='username'
                            maxLength='20'
                            minLength='6'
                            defaultValue={getData('user')?.username ?? ''}
                            readOnly= {!admin}
                            onChange={ event => {
                                user.username = event.target.value
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
                                    defaultValue={formatCPF(getData('user')?.person
                                        ?.cpf) ?? ''}
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
                                    Erro
                                </p>

                                <label>Nome Fantasia</label>
                                <input
                                    name='tradeName'
                                    maxLength='128'
                                    minLength='6'
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

                                <label>Razão social</label>
                                <input
                                    name='tradeName'
                                    maxLength='128'
                                    minLength='6'
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
                                        console.log('FORM 1 FAIL')
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
                                Ocorreu um erro
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
                            maxLength='64'
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
                                        setModal([false, true])
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
                                            console.log('FORM 2 FAIL')
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
                                Ocorreu um erro
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
            </div>

            <div className='navigation'>
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
                            setModal([true, false])
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

export default Profile