import React, { useEffect, useState } from 'react'

import NavBar from '../panels/NavBar'

import DeviceMenu from '../panels/DeviceMenu'

import { api } from '../../services/api'

import { logout } from '../../services/auth'

import fetch from '../../services/fetch'

import {
    formatPhone,
    formatCPF,
    formatCNPJ,
    formatCEP,
    formatDate,
    getOnlyNumbers
} from '../../services/util'

import '../../styles/newuser.css'

const NewUser = ({ history }) => {
    const user = {
        username: '',
        password: '',
        email: '',
        phone: '',
        company: {},
        consumerUnits: []
    }

    const consumerUnit = {
        number: '',
        zip: '',
        city: '',
        state: '',
        country: '',
        address: '',
        name: '',
        devices: []
    }

    const [step, setStep] = useState(0)
    const [userType, setUserType] = useState('company')
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('Ocorreu um erro')

    useEffect( () => {
        if (userType === 'person') {
            delete user.company
            user.person = {}
        } else if (userType === 'company') {
            delete user.person
            user.company = {}
        }
    }, [userType])

    const validateForm = () => {
        const form = document.querySelector('form')
        const fields = Object.values(form)
        let isValid = true

        fields.forEach(field => {
            if (field.tagName === 'INPUT' && field.value === '') {
                isValid = false
            }
        })

        return isValid
    }

    const clearForm = () => {
        const form = document.querySelector('form')
        const fields = Object.values(form)

        fields.forEach((field, index) => {
            if (index > 4 && field.tagName === 'INPUT') {
                field.value = ''
            }
        })
    }

    const resetForm = () => {
        document.querySelector('form').reset()
    }

    const handleSubmit = async () => {
        try {
            const response = await api.post('/user/add', user)

            const status = response?.status

            if (status === 200) {
                setSuccess(true)

                setTimeout(() => {
                    setSuccess(false)
                }, 1500)

                setTimeout (async () => {
                    if (await fetch()) {
                        history.push('/users-list')
                    } else {
                        logout()
                        history.push('/login')
                    }
                }, 2500)
            } else {
                setError(true)

                setTimeout(() => {
                    setError(false)
                }, 1500)
            }
        } catch (err) {
            console.log(err?.message ?? err?.response?.data?.message)

            const status = err?.response?.status

            if (status === 400) {
                setErrorMessage(err?.response?.data?.message)
            }

            if (status) {
                setError(true)
            }
        }
    }

    return <div className='newuser'>
        <NavBar />
        <DeviceMenu />
        <div className='main'>
            {step === 0 ?
                <form>
                    <h1>
                        Dados do usuário
                    </h1>
                    <label>Nome de usuário</label>
                    <input
                        name='username'
                        onChange={ event => {
                            user.username = event.target.value
                        }}
                    />
                    <label>Senha</label>
                    <input
                        type='password'
                        name='password'
                        onChange={ event => {
                            user.password = event.target.value
                        }}
                    />
                    <label>Email</label>
                    <input
                        name='email'
                        onChange={ event => {
                            user.email = event.target.value
                        }}
                    />
                    <label>Telefone</label>
                    <input
                        name='phone'
                        onChange={ event => {
                            user.phone = getOnlyNumbers(event.target.value)
                            event.target.value =  formatPhone(
                                event.target.value
                            )
                        }}
                    />
                    <div className='checkbox'>
                        <input
                            type='checkbox'
                            onClick={() => {
                                if (userType === 'company') {
                                    clearForm()
                                    setUserType('person')
                                } else if (userType === 'person') {
                                    clearForm()
                                    setUserType('company')
                                }
                            }}
                        />
                        <label>Sou pessoa física</label>
                    </div>
                    {userType === 'company' ?
                        <>
                            <label>CNPJ</label>
                            <input
                                name='cnpj'
                                onChange={ event => {
                                    user.company.cnpj = getOnlyNumbers(event
                                        .target.value)
                                    event.target.value =  formatCNPJ(
                                        event.target.value
                                    )
                                }}
                            />
                            <label>Razão social</label>
                            <input
                                name='tradeName'
                                onChange={ event => {
                                    user.company.tradeName = event
                                        .target
                                        .value
                                }}
                            />
                            <label>Descrição</label>
                            <input
                                name='description'
                                onChange={ event => {
                                    user.company.description = event
                                        .target
                                        .value
                                }}
                            />
                        </>
                        :
                        <>
                            <label>CPF</label>
                            <input
                                name='cpf'
                                onChange={ event => {
                                    user.person.cpf = getOnlyNumbers(event
                                        .target.value)
                                    event.target.value =  formatCPF(
                                        event.target.value
                                    )
                                }}
                            />
                            <label>Data de nascimento</label>
                            <input
                                name='birth'
                                onChange={ event => {
                                    user.person.birth = event.target.value
                                    event.target.value = formatDate(
                                        event.target.value
                                    )
                                }}
                            />
                        </>
                    }

                    <button
                        className='classic-button'
                        onClick={ event => {
                            event.preventDefault()
                            if (validateForm()) {
                                setStep(1)
                            } else {
                                setErrorMessage('Preencha todos os campos')
                                setError(true)

                                setTimeout(() => {
                                    setError(false)
                                }, 3000)
                            }
                        }}
                    >
                        Avançar
                    </button>

                    {!success && error?
                        <p className='error'>
                            { errorMessage }
                        </p>
                        : null
                    }
                </form>
                :
                null
            }

            {step === 1 ?
                <form onSubmit={event=>{
                    event.preventDefault()
                }}>
                    <h1>
                        Dados da Unidade Consumidora
                    </h1>
                    <label>Número</label>
                    <input
                        name='number'
                        onChange={ event => {
                            consumerUnit
                                .number = event.target.value
                        }}
                    />
                    <label>Nome</label>
                    <input
                        name='name'
                        onChange={ event => {
                            consumerUnit
                                .name = event.target.value
                        }}
                    />
                    <label>Endereço</label>
                    <input
                        name='address'
                        onChange={ event => {
                            consumerUnit
                                .address = event.target.value
                        }}
                    />
                    <label>CEP</label>
                    <input
                        name='zip'
                        onChange={ event => {
                            consumerUnit
                                .zip = getOnlyNumbers(event.target.value)
                            event.target.value =  formatCEP(event.target
                                .value)
                        }}
                    />
                    <label>Cidade</label>
                    <input
                        name='city'
                        onChange={ event => {
                            consumerUnit
                                .city = event.target.value
                        }}
                    />
                    <label>Estado</label>
                    <input
                        name='state'
                        onChange={ event => {
                            consumerUnit
                                .state = event.target.value
                        }}
                    />

                    <div className='buttons'>
                        <button
                            className='classic-button'
                            onClick={event => {
                                event.preventDefault()
                                setStep(0)
                            }}
                        >
                            Voltar
                        </button>

                        <button
                            className='classic-button'
                            onClick={event => {
                                event.preventDefault()
                                if (validateForm()) {
                                    user.consumerUnits.push(consumerUnit)
                                    resetForm()
                                } else {
                                    setErrorMessage('Preencha todos os campos')
                                    setError(true)

                                    setTimeout(() => {
                                        setError(false)
                                    }, 3000)
                                }
                            }}
                        >
                            Adicionar UC
                        </button>

                        <button
                            className='classic-button'
                            onClick={event => {
                                event.preventDefault()
                                if (validateForm()) {
                                    handleSubmit()
                                } else {
                                    setErrorMessage('Preencha todos os campos')
                                    setError(true)

                                    setTimeout(() => {
                                        setError(false)
                                    }, 3000)
                                }
                            }}
                        >
                            Salvar
                        </button>
                    </div>

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
                </form>
                :
                null
            }
        </div>
    </div>
}

export default NewUser