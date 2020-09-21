import React, { useState } from 'react'

import NavBar from '../panels/NavBar'

import DeviceMenu from '../panels/DeviceMenu'

import { api } from '../../services/api'

import { logout } from '../../services/auth'

import { getData }  from '../../services/storage'

import fetch from '../../services/fetch'

import {
    formatCEP,
    getOnlyNumbers
} from '../../services/util'

import '../../styles/newunit.css'

const NewUnit = ( { history }) => {

    const user = getData('user')

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

    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('Ocorreu um erro')
    const [loading, setLoading] = useState(false)
    const [isValid, setIsValid] = useState(
        new Array(6).fill('')
    )

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
                setErrorMessage('Unidade consumidora já cadastrado')

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

    return <div className='newunit'>
        <NavBar />
        <DeviceMenu />

        <div className='main'>
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
                                history.push('/profile')
                            }}
                        >
                                Voltar
                        </button>

                        <button
                            className='classic-button'
                            onClick={event => {
                                buttonPress(event, () => {
                                    user.consumerUnits.push(consumerUnit)
                                    handleSubmit()
                                })
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
        </div>
    </div>
}

export default NewUnit