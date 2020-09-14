import React, { useState } from 'react'

import NavBar from '../panels/NavBar'

import DeviceMenu from '../panels/DeviceMenu'

import { getUser, clearData } from '../../services/storage'

import { isAdmin, logout } from '../../services/auth'

import { api } from '../../services/api'

import fetch from '../../services/fetch'

import '../../styles/profile.css'

const formatPhone = phone =>
        phone
            ?.replace(/\D/g, '')
            .replace(/(\d{11})(\d)/, '$1')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')

const formatCPF = cpf =>
        cpf
            ?.replace(/\D/g, '')
            .replace(/(\d{11})(\d)/, '$1')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1-$2')

const formatCNPJ = cnpj =>
        cnpj
            ?.replace(/\D/g, '')
            .replace(/(\d{14})(\d)/, '$1')
            .replace(/(\d{2})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{4})(\d)/, '$1-$2')

const formatCEP = cep =>
        cep
            ?.replace(/\D/g, '')
            .replace(/(\d{8})(\d)/, '$1')
            .replace(/(\d{5})(\d)/, '$1-$2')

const formatTimeStamp = timeStamp =>
        timeStamp
            ?.replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '$1/$2')
            .replace(/(\d{2})(\d)/, '$1/$2')
            .replace(/(\d{4})(\d)/, '$1')

const formatDate = input =>
    input
        .replace(/\D/g, '')
        .replace(/(\d{8})(\d)/, '$1')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\d{2})(\d)/, '$1/$2')

const Profile = ({ history }) => {
    const admin = isAdmin()
    const user = getUser()
    const [consumerUnitIndex, setConsumerUnitIndex] = useState()
    const [success, setSuccess] = useState([false, false])
    const [error, setError] = useState([false, false])

    const handleSubmit = async (event, index) => {
        try {
            event.preventDefault()

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
        }
    }

    return <div className='profile'>
        <NavBar />
        <DeviceMenu
            setConsumerUnitIndex = { setConsumerUnitIndex }
        />
        <div className='main'>
            <div className='forms'>
                {getUser ?
                    <form>
                        <h1>
                            Dados do Usuário
                        </h1>
                        <label>Nome de usuário</label>
                        <input
                            name='username'
                            defaultValue={getUser()?.username ?? ''}
                            readOnly= {!admin}
                            onChange={ event => {
                                user.username = event.target.value
                            }}
                        />
                        <label>Email</label>
                        <input
                            name='email'
                            defaultValue={getUser()?.email ?? ''}
                            readOnly= {!admin}
                            onChange={ event => {
                                user.email = event.target.value
                            }}
                        />
                        <label>Telefone</label>
                        <input
                            name='phone'
                            defaultValue={formatPhone(getUser()?.phone) ?? ''}
                            readOnly= {!admin}
                            onChange={ event => {
                                user.phone = event.target.value.match(/\d+/g)
                                event.target.value =  formatPhone(
                                    event.target.value
                                )
                            }}
                        />
                        {getUser()?.person ?
                            <>
                                <label>CPF</label>
                                <input
                                    name='cpf'
                                    defaultValue={formatCPF(getUser()?.person
                                        ?.cpf) ?? ''}
                                    readOnly= {!admin}
                                    onChange={ event => {
                                        user.person.cpf = event
                                            .target.value.match(/\d+/g)
                                        event.target.value =  formatCPF(
                                            event.target.value
                                        )
                                    }}
                                />
                                <label>Data de nascimento</label>
                                <input
                                    name='birth'
                                    defaultValue={formatTimeStamp(
                                        getUser()?.person?.birth
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
                                            getUser()?.company?.cnpj
                                        ) ?? '--'
                                    }
                                    readOnly= {!admin}
                                    onChange={ event => {
                                        user.company.cnpj = event
                                            .target.value.match(/\d+/g)
                                        user.phone = event.target.value
                                        event.target.value =  formatCNPJ(
                                            event.target.value
                                        )
                                    }}
                                />
                                <label>Razão social</label>
                                <input
                                    name='tradeName'
                                    defaultValue={getUser()?.company
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
                                    defaultValue={getUser()?.company
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
                                onClick={event => {
                                    handleSubmit(event, user, 0)
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

                {getUser().consumerUnits[ consumerUnitIndex ] ?
                    <form>
                        <h1>
                            Dados da Unidade Consumidora
                        </h1>
                        <label>Número</label>
                        <input
                            name='number'
                            defaultValue={getUser()
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
                            defaultValue={getUser()
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
                            defaultValue={getUser()
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
                            defaultValue={formatCEP(getUser()
                                .consumerUnits[ consumerUnitIndex ]?.zip) ?? ''}
                            readOnly= {!admin}
                            onChange={ event => {
                                user
                                    .consumerUnits[ consumerUnitIndex]
                                    .zip = event.target.value.match(/\d+/g)
                                event.target.value =  formatCEP(event.target
                                    .value)
                            }}
                        />
                        <label>Cidade</label>
                        <input
                            name='city'
                            defaultValue={getUser()
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
                            defaultValue={getUser()
                                .consumerUnits[ consumerUnitIndex ]
                                ?.state ?? ''}
                            readOnly= {!admin}
                            onChange={ event => {
                                user.consumerUnits[ consumerUnitIndex]
                                    .state = event.target.value
                            }}
                        />
                        {admin ?
                            <button
                                onClick={ event => {
                                    handleSubmit(event, user, 1)
                                }}
                            >
                                Salvar
                            </button>
                            : null
                        }
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
                    </div>
                }
            </div>
            <div className='navigation'>
                <button
                    onClick={() =>{
                        history.push('/dashboard')
                    }}
                >
                    Dashboard
                </button>
                {admin ?
                    <button
                        className='delete'
                        onClick={ async () => {
                            try {
                                const response = await api.delete(
                                    `/user/remove?_id=${getUser()._id}`
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