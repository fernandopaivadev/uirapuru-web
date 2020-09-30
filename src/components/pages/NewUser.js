import React, { useEffect, useState, useCallback } from 'react'

import NavBar from '../panels/NavBar'

import Modal from '../panels/Modal'

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
    getOnlyNumbers,
    validateForm,
    setFormValidation
} from '../../services/forms'

import '../../styles/newuser.css'

const NewUser = ({ history }) => {
    const [user, setUser] = useState({
        username: '',
        password: '',
        email: '',
        phone: '',
        company: {},
        consumerUnits: []
    })

    const consumerUnit = {
        number: '',
        zip: '',
        city: '',
        state: '',
        country: 'Brasil',
        address: '',
        name: '',
        devices: []
    }

    const [modal, setModal] = useState(false)
    const [step, setStep] = useState(0)
    const [userType, setUserType] = useState('company')
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('Ocorreu um erro')
    const [loading, setLoading] = useState(false)

    useEffect(
        useCallback(() => {
            const _user = user

            if (userType === 'person') {
                delete _user.company
                _user.person = {}
            } else if (userType === 'company') {
                delete _user.person
                _user.company = {}
            }

            setUser(_user)
        }, [userType, user]
        ), []
    )

    useEffect(() => {
        setFormValidation()
    })

    const clearForm = mode => {
        if (mode === 'user-type') {
            const form = document.querySelector('form')
            const formChildren = [...form.children]

            formChildren.forEach((field, index) => {
                if (index > 4 && field.tagName === 'INPUT') {
                    field.value = ''
                }
            })

        } else if (mode === 'all') {
            document.querySelector('form').reset()
        }

    }

    const handleSubmit = async () => {
        try {
            setLoading(true)

            const response = await api.post('/user/add', user)

            const status = response?.status

            if (status) {
                setLoading(false)
            }

            if (status === 201) {
                setSuccess(true)

                if (await fetch()) {
                    history.push('/users-list')
                } else {
                    logout()
                    history.push('/login')
                }
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
                setErrorMessage('Erro no processamento do formulário')
            } else if (status === 409)
                setErrorMessage('Usuário já cadastrado')

            if (status) {
                setLoading(false)
                setError(true)
            }
        }
    }

    const buttonPress = task => {
        if (validateForm()) {
            task()
        } else {
            setErrorMessage('Preencha todos os campos')
            setError(true)

            setTimeout(() => {
                setError(false)
            }, 3000)
        }
    }

    return <div className='newuser'>
        <NavBar />
        { modal ?
            <Modal
                message={'Você tem certeza?'}
                taskOnYes={() => {
                    setModal(false)
                    buttonPress(handleSubmit)
                }}
                taskOnNo={() => {
                    setModal(false)
                }}
            />
            : null
        }
        <div className='main'>
            {step === 0 ?
                <form>
                    <h1>
                        Dados do novo usuário
                    </h1>

                    <label>Nome de usuário</label>
                    <input
                        name='username'
                        maxLength='20'
                        minLength='6'
                        required
                        pattern='[a-zA-Z0-9]{6,20}'
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

                    <label>Senha</label>
                    <input
                        type='password'
                        name='password'
                        maxLength='128'
                        minLength='8'
                        required
                        onChange={ event => {
                            user.password = event.target.value
                        }}
                    />
                    <p className='error-message'>
                        Digite no mínimo 8 caracteres
                    </p>

                    <label>Email</label>
                    <input
                        name='email'
                        maxLength='40'
                        minLength='10'
                        required
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
                        onChange={ event => {
                            user.phone = getOnlyNumbers(event.target.value)
                            event.target.value = formatPhone(
                                event.target.value
                            )
                        }}
                    />
                    <p className='error-message'>
                        Número de telefone inválido
                    </p>

                    <div className='checkbox'>
                        <input
                            type='checkbox'
                            onClick={() => {
                                clearForm('user-type')

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
                                required
                                pattern='\d{2}\.\d{3}\.\d{3}.\d{4}-\d{2}'
                                onChange={ event => {
                                    user.company.cnpj = getOnlyNumbers(event
                                        .target.value)
                                    event.target.value = formatCNPJ(
                                        event.target.value
                                    )
                                }}
                            />
                            <p className='error-message'>
                                CNPJ inválido
                            </p>

                            <label>Nome fantasia</label>
                            <input
                                name='name'
                                maxLength='128'
                                minLength='6'
                                required
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
                        :
                        <>
                            <label>Nome completo</label>
                            <input
                                name='name'
                                maxLength='128'
                                minLength='10'
                                required
                                onChange={ event => {
                                    user.person.name = event
                                        .target.value
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
                                onChange={ event => {
                                    user.person.cpf = getOnlyNumbers(event
                                        .target.value)
                                    event.target.value = formatCPF(
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
                                onChange={ event => {
                                    user.person.birth = () =>
                                        event.target.value.replace('/', '-')
                                    event.target.value = formatDate(
                                        event.target.value
                                    )
                                }}
                            />
                            <p className='error-message'>
                                Data inválida
                            </p>
                        </>
                    }

                    <div className='buttons'>
                        <button
                            className='classic-button'
                            onClick={event => {
                                event.preventDefault()
                                history.push('/users-list')
                            }}
                        >
                            Voltar
                        </button>
                        <button
                            className='classic-button'
                            onClick={event => {
                                event.preventDefault()
                                buttonPress(() => {
                                    setStep(1)
                                })
                            }}
                        >
                            Avançar
                        </button>
                    </div>

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
                        Dados da nova unidade consumidora
                    </h1>
                    <label>Número</label>
                    <input
                        name='number'
                        maxLength='64'
                        minLength='6'
                        required
                        onChange={ event => {
                            consumerUnit
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
                        onChange={ event => {
                            consumerUnit
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
                        onChange={ event => {
                            consumerUnit
                                .address = event.target.value
                        }}
                    />
                    <p className='error-message'>
                        Digite no mínimo 10 caracteres
                    </p>

                    <label>CEP</label>
                    <input
                        name='zip'
                        maxLength='64'
                        required
                        pattern='\d{5}-\d{3}'
                        onChange={ event => {
                            consumerUnit
                                .zip = getOnlyNumbers(event.target.value)
                            event.target.value = formatCEP(event.target
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
                        onChange={ event => {
                            consumerUnit
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
                        onChange={ event => {
                            consumerUnit
                                .state = event.target.value
                        }}
                    />
                    <p className='error-message'>
                        Digite no mínimo 3 caracteres
                    </p>

                    {loading ?
                        <div className='loading-container'>
                            <progress className='circular-progress'/>
                        </div>
                        :
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
                                    buttonPress(() => {
                                        user.consumerUnits.push(consumerUnit)
                                        clearForm('all')
                                    })
                                }}
                            >
                                Adicionar UC
                            </button>

                            <button
                                className='classic-button'
                                onClick={event => {
                                    event.preventDefault()
                                    setModal(true)
                                }}
                            >
                                Salvar
                            </button>
                        </div>
                    }
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