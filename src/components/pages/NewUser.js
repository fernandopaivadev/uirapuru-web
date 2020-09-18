import React, { useEffect, useState } from 'react'

import NavBar from '../panels/NavBar'

import DeviceMenu from '../panels/DeviceMenu'

import { api } from '../../services/api'

import { logout } from '../../services/auth'

import fetch from '../../services/fetch'

import {
    formatUsername,
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
    const [isValid, setIsValid] = useState([
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
    ])

    const clearIsValid = () => {
        const _isValid = [...isValid]

        _isValid.forEach((item, index) => {
            _isValid[index] = false
        })

        setIsValid([..._isValid])
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

    useEffect(() => {
        if (userType === 'person') {
            delete user.company
            user.person = {}
        } else if (userType === 'company') {
            delete user.person
            user.company = {}
        }
    }, [userType])

    const validateInput = (event, min, index, onlyNumbers) => {
        const _isValid = [...isValid]
        const { value } = event.target

        if (onlyNumbers) {
            if (getOnlyNumbers(value).length >= min) {
                _isValid[index] = true
            } else {
                _isValid[index] = false
            }
        } else {
            if (value.length >= min) {
                _isValid[index] = true
            } else {
                _isValid[index] = false
            }
        }

        setIsValid(_isValid)
    }

    const validateForm = () => {
        let sum = 0

        isValid.forEach(item => {
            if (item) {
                sum = sum + 1
            }
        })

        if (userType === 'company' && sum === 8) {
            return true
        } else if (userType === 'person' && sum === 7) {
            return true
        } else {
            return false
        }
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
                        maxLength='20'
                        onChange={ event => {
                            event.target.value = formatUsername(
                                event.target.value
                            )
                            user.username = event.target.value
                        }}
                        onBlur={event => {
                            validateInput(event, 6, 0)
                        }}
                    />
                    <label>Senha</label>
                    <input
                        type='password'
                        name='password'
                        maxLength='128'
                        onChange={ event => {
                            user.password = event.target.value
                        }}
                        onBlur={event => {
                            validateInput(event, 6, 1)
                        }}
                    />
                    <label>Email</label>
                    <input
                        name='email'
                        maxLength='40'
                        onChange={ event => {
                            user.email = event.target.value
                        }}
                        onBlur={event => {
                            validateInput(event, 10, 2)
                        }}
                    />
                    <label>Telefone</label>
                    <input
                        name='phone'
                        onChange={ event => {
                            user.phone = getOnlyNumbers(event.target.value)
                            event.target.value = formatPhone(
                                event.target.value
                            )
                        }}
                        onBlur={event => {
                            validateInput(event, 6, 3, true)
                        }}
                    />
                    <div className='checkbox'>
                        <input
                            type='checkbox'
                            onClick={() => {
                                clearForm()

                                if (userType === 'company') {
                                    setUserType('person')
                                } else if (userType === 'person') {
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
                                    event.target.value = formatCNPJ(
                                        event.target.value
                                    )
                                }}
                                onBlur={event => {
                                    validateInput(event, 14, 4, true)
                                }}
                            />
                            <label>Nome fantasia</label>
                            <input
                                name='name'
                                maxLength='128'
                                onChange={ event => {
                                    user.company.name = event
                                        .target
                                        .value
                                }}
                                onBlur={event => {
                                    validateInput(event, 6, 5)
                                }}
                            />
                            <label>Razão social</label>
                            <input
                                name='tradeName'
                                maxLength='128'
                                onChange={ event => {
                                    user.company.tradeName = event
                                        .target
                                        .value
                                }}
                                onBlur={event => {
                                    validateInput(event, 6, 6)
                                }}
                            />
                            <label>Descrição</label>
                            <input
                                name='description'
                                maxLength='512'
                                onChange={ event => {
                                    user.company.description = event
                                        .target
                                        .value
                                }}
                                onBlur={event => {
                                    validateInput(event, 10, 7)
                                }}
                            />
                        </>
                        :
                        <>
                            <label>Nome completo</label>
                            <input
                                name='name'
                                maxLength='128'
                                onChange={ event => {
                                    user.person.name = event
                                        .target.value
                                }}
                                onBlur={event => {
                                    validateInput(event, 6, 4)
                                }}
                            />
                            <label>CPF</label>
                            <input
                                name='cpf'
                                onChange={ event => {
                                    user.person.cpf = getOnlyNumbers(event
                                        .target.value)
                                    event.target.value = formatCPF(
                                        event.target.value
                                    )
                                }}
                                onBlur={event => {
                                    validateInput(event, 11, 5, true)
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
                                onBlur={event => {
                                    validateInput(event, 8, 6, true)
                                }}
                            />
                        </>
                    }

                    <button
                        className='classic-button'
                        onClick={ event => {
                            clearIsValid()
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
                        maxLength='64'
                        onChange={ event => {
                            consumerUnit
                                .number = event.target.value
                        }}
                    />
                    <label>Nome da unidade consumidora</label>
                    <input
                        name='name'
                        maxLength='64'
                        onChange={ event => {
                            consumerUnit
                                .name = event.target.value
                        }}
                    />
                    <label>Endereço</label>
                    <input
                        name='address'
                        maxLength='256'
                        onChange={ event => {
                            consumerUnit
                                .address = event.target.value
                        }}
                    />
                    <label>CEP</label>
                    <input
                        name='zip'
                        maxLength='64'
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
                        maxLength='64'
                        onChange={ event => {
                            consumerUnit
                                .city = event.target.value
                        }}
                    />
                    <label>Estado</label>
                    <input
                        name='state'
                        maxLength='64'
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