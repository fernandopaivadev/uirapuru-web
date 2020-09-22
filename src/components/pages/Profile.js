import React, { useState } from 'react'

import NavBar from '../panels/NavBar'

import DeviceMenu from '../panels/DeviceMenu'

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
    getOnlyNumbers
} from '../../services/util'

import '../../styles/profile.css'

import '../../styles/util.css'

const Profile = ({ history }) => {
    const admin = isAdmin()
    const user = getData('user')
    const [consumerUnitIndex, setConsumerUnitIndex] = useState()
    const [modal, setModal] = useState(false)
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

    const handleSubmit = async (event, index) => {
        try {
            event.preventDefault()

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
        <DeviceMenu
            setConsumerUnitIndex = { setConsumerUnitIndex }
        />
        { modal ?
            <div className='modal-container'>
                <div className='modal'>
                    <p>Você tem certeza?</p>
                    <div className='buttons'>
                        <button
                            className='classic-button'
                            onClick={ () => {
                                deleteUser()
                            }}
                        >
                            Sim
                        </button>
                        <button
                            id='cancel-button'
                            className='classic-button'
                            onClick= { () => {
                                setModal(false)
                            }}
                        >
                            Não
                        </button>
                    </div>
                </div>
            </div>
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
                            defaultValue={getData('user')?.username ?? ''}
                            readOnly= {!admin}
                            onChange={ event => {
                                user.username = event.target.value
                            }}
                        />
                        <label>Email</label>
                        <input
                            name='email'
                            defaultValue={getData('user')?.email ?? ''}
                            readOnly= {!admin}
                            onChange={ event => {
                                user.email = event.target.value
                            }}
                        />
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
                        {getData('user')?.person ?
                            <>
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
                                <label>Razão social</label>
                                <input
                                    name='tradeName'
                                    defaultValue={getData('user')?.company
                                        ?.tradeName ?? ''}
                                    readOnly= {!admin}
                                    onChange={ event => {
                                        user.company.tradeName = event
                                            .target
                                            .value
                                    }}
                                />
                                <label>Descrição</label>
                                <input
                                    name='description'
                                    defaultValue={getData('user')?.company
                                        ?.description ?? ''}
                                    readOnly= {!admin}
                                    onChange={ event => {
                                        user.company.description = event
                                            .target
                                            .value
                                    }}
                                />
                            </>
                        }
                        {admin ?
                            <button
                                className='classic-button'
                                onClick={event => {
                                    handleSubmit(event, 0)
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
                            defaultValue={getData('user')
                                .consumerUnits[ consumerUnitIndex ]
                                ?.number ?? ''}
                            readOnly= {!admin}
                            onChange={ event => {
                                user.consumerUnits[ consumerUnitIndex]
                                    .number = event.target.value
                            }}
                        />
                        <label>Nome</label>
                        <input
                            name='name'
                            defaultValue={getData('user')
                                .consumerUnits[ consumerUnitIndex ]
                                ?.name ?? ''}
                            readOnly= {!admin}
                            onChange={ event => {
                                user.consumerUnits[ consumerUnitIndex]
                                    .name = event.target.value
                            }}
                        />
                        <label>Endereço</label>
                        <input
                            name='address'
                            defaultValue={getData('user')
                                .consumerUnits[ consumerUnitIndex ]
                                ?.address ?? ''}
                            readOnly= {!admin}
                            onChange={ event => {
                                user.consumerUnits[ consumerUnitIndex]
                                    .address = event.target.value
                            }}
                        />
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
                        <label>Cidade</label>
                        <input
                            name='city'
                            defaultValue={getData('user')
                                .consumerUnits[ consumerUnitIndex ]
                                ?.city ?? ''}
                            readOnly= {!admin}
                            onChange={ event => {
                                user.consumerUnits[ consumerUnitIndex]
                                    .city = event.target.value
                            }}
                        />
                        <label>Estado</label>
                        <input
                            name='state'
                            defaultValue={getData('user')
                                .consumerUnits[ consumerUnitIndex ]
                                ?.state ?? ''}
                            readOnly= {!admin}
                            onChange={ event => {
                                user.consumerUnits[ consumerUnitIndex]
                                    .state = event.target.value
                            }}
                        />
                        <div className='buttons'>
                            {admin ?
                                <button
                                    className='classic-button'
                                    onClick={ event => {
                                        handleSubmit(event, 1)
                                    }}
                                >
                                    Salvar
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
                        <p>Escolha uma unidade Consumidora</p>
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
                            setModal(true)
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