import React, { useEffect, useState } from 'react'

import NavBar from '../panels/NavBar'

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

    const [step, setStep] = useState(1)
    const [userType, setUserType] = useState('company')
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('Ocorreu um erro')
    const [loading, setLoading] = useState(false)
    const [isValid, setIsValid] = useState(
        new Array(8).fill('')
    )

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
        const _user = user

        if (userType === 'person') {
            delete _user.company
            _user.person = {}
        } else if (userType === 'company') {
            delete _user.person
            _user.company = {}
        }

        setUser(_user)
    }, [userType])

    const validateInput = (event, min, index, onlyNumbers) => {
        const _isValid = [...isValid]
        const { value } = event.target

        if (onlyNumbers) {
            if (getOnlyNumbers(value).length >= min) {
                _isValid[index] = 'valid'
            } else {
                _isValid[index] = 'not valid'
            }
        } else {
            if (value.length >= min) {
                _isValid[index] = 'valid'
            } else {
                _isValid[index] = 'not valid'
            }
        }

        setIsValid(_isValid)
    }

    const validateForm = () => {
        let sum = 0
        let expected = 0

        const form = document.querySelector('form')
        const fields = Object.values(form)

        fields.forEach(field => {
            if (field.tagName === 'INPUT' && field.type !== 'checkbox') {
                expected = expected + 1
            }
        })

        isValid.forEach(item => {
            if (item === 'valid') {
                sum = sum + 1
            }
        })

        if (sum === expected) {
            return true
        } else {
            return false
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

    const buttonPress = (event, task) => {
        event.preventDefault()
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
                    {isValid[0] === 'not valid' ?
                        <p className='validation-error'>
                            Digite no mínimo 6 caracteres
                        </p>
                        : null
                    }

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
                    {isValid[1] === 'not valid' ?
                        <p className='validation-error'>
                            Digite no mínimo 6 caracteres
                        </p>
                        : null
                    }

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
                    {isValid[2] === 'not valid' ?
                        <p className='validation-error'>
                            Digite no mínimo 10 caracteres
                        </p>
                        : null
                    }

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
                            validateInput(event, 10, 3, true)
                        }}
                    />
                    {isValid[3] === 'not valid' ?
                        <p className='validation-error'>
                            Número de telefone inválido
                        </p>
                        : null
                    }

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
                            {isValid[4] === 'not valid' ?
                                <p className='validation-error'>
                                    CNPJ inválido
                                </p>
                                : null
                            }

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
                            {isValid[5] === 'not valid' ?
                                <p className='validation-error'>
                                    Digite no mínimo 6 caracteres
                                </p>
                                : null
                            }

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
                            {isValid[6] === 'not valid' ?
                                <p className='validation-error'>
                                    Digite no mínimo 6 caracteres
                                </p>
                                : null
                            }

                            <label>Descrição</label>
                            <input
                                type='textarea'
                                name='description'
                                maxLength='512'
                                onChange={ event => {
                                    user.company.description = event
                                        .target
                                        .value
                                }}
                                onBlur={event => {
                                    validateInput(event, 50, 7)
                                }}
                            />
                            {isValid[7] === 'not valid' ?
                                <p className='validation-error'>
                                    Digite no mínimo 50 caracteres
                                </p>
                                : null
                            }

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
                                    validateInput(event, 10, 4)
                                }}
                            />
                            {isValid[4] === 'not valid' ?
                                <p className='validation-error'>
                                    Digite no mínimo 6 caracteres
                                </p>
                                : null
                            }

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
                            {isValid[5] === 'not valid' ?
                                <p className='validation-error'>
                                    CPF inválido
                                </p>
                                : null
                            }

                            <label>Data de nascimento</label>
                            <input
                                name='birth'
                                onChange={ event => {
                                    user.person.birth = () =>
                                        event.target.value.replace('/', '-')
                                    event.target.value = formatDate(
                                        event.target.value
                                    )
                                }}
                                onBlur={event => {
                                    validateInput(event, 8, 6, true)
                                }}
                            />
                            {isValid[6] === 'not valid' ?
                                <p className='validation-error'>
                                    Data inválida
                                </p>
                                : null
                            }
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
                                buttonPress(event, () => {
                                    clearIsValid()
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
                        onBlur={event => {
                            validateInput(event, 6, 0, true)
                        }}
                    />
                    {isValid[0] === 'not valid' ?
                        <p className='validation-error'>
                            Digite no mínimo 6 caracteres
                        </p>
                        : null
                    }

                    <label>Nome da unidade consumidora</label>
                    <input
                        name='name'
                        maxLength='64'
                        onChange={ event => {
                            consumerUnit
                                .name = event.target.value
                        }}
                        onBlur={event => {
                            validateInput(event, 8, 1)
                        }}
                    />
                    {isValid[1] === 'not valid' ?
                        <p className='validation-error'>
                            Digite no mínimo 8 caracteres
                        </p>
                        : null
                    }

                    <label>Endereço</label>
                    <input
                        name='address'
                        maxLength='256'
                        onChange={ event => {
                            consumerUnit
                                .address = event.target.value
                        }}
                        onBlur={event => {
                            validateInput(event, 10, 2)
                        }}
                    />
                    {isValid[2] === 'not valid' ?
                        <p className='validation-error'>
                            Digite no mínimo 10 caracteres
                        </p>
                        : null
                    }

                    <label>CEP</label>
                    <input
                        name='zip'
                        maxLength='64'
                        onChange={ event => {
                            consumerUnit
                                .zip = getOnlyNumbers(event.target.value)
                            event.target.value = formatCEP(event.target
                                .value)
                        }}
                        onBlur={event => {
                            validateInput(event, 8, 3, true)
                        }}
                    />
                    {isValid[3] === 'not valid' ?
                        <p className='validation-error'>
                            CEP inválido
                        </p>
                        : null
                    }

                    <label>Cidade</label>
                    <input
                        name='city'
                        maxLength='64'
                        onChange={ event => {
                            consumerUnit
                                .city = event.target.value
                        }}
                        onBlur={event => {
                            validateInput(event, 3, 4)
                        }}
                    />
                    {isValid[4] === 'not valid' ?
                        <p className='validation-error'>
                            Digite no mínimo 3 caracteres
                        </p>
                        : null
                    }

                    <label>Estado</label>
                    <input
                        name='state'
                        maxLength='64'
                        onChange={ event => {
                            consumerUnit
                                .state = event.target.value
                        }}
                        onBlur={event => {
                            validateInput(event, 3, 5)
                        }}
                    />
                    {isValid[5] === 'not valid' ?
                        <p className='validation-error'>
                            Digite no mínimo 3 caracteres
                        </p>
                        : null
                    }

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
                                    buttonPress(event, () => {
                                        user.consumerUnits.push(consumerUnit)
                                        resetForm()
                                    })
                                }}
                            >
                                Adicionar UC
                            </button>

                            <button
                                className='classic-button'
                                onClick={event => {
                                    buttonPress(event, handleSubmit)
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