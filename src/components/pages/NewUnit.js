import React, { useState } from 'react'

import NavBar from '../panels/NavBar'

import { api } from '../../services/api'

import { logout } from '../../services/auth'

import { getData, storeData }  from '../../services/storage'

import fetch from '../../services/fetch'

import {
    formatCEP,
    getOnlyNumbers,
    validateForm
} from '../../services/util'

import '../../styles/newunit.css'

const NewUnit = ({ history }) => {
    const user = getData('user')

    const [consumerUnit] = useState({
        number: '',
        zip: '',
        city: '',
        state: '',
        country: 'Brasil',
        address: '',
        name: '',
        devices: []
    })

    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('Ocorreu um erro')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async event => {
        try {
            event.preventDefault()
            storeData('user', user)
            setLoading(true)

            const response = await api.put('/user/update', user)

            const status = response?.status

            if (status) {
                setLoading(false)
            }

            if (status === 200) {
                setSuccess(true)

                if (await fetch()) {
                    history.push('/profile')
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
                setErrorMessage('Unidade consumidora já cadastrada')

            if (status) {
                setLoading(false)
                setError(true)
            }
        }
    }

    return <div className='newunit'>
        <NavBar />
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
                    minLength='6'
                    maxLength='16'
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
                    pattern='\d{5}-\d{3}'
                    required
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
                                history.push('/profile')
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
                                    handleSubmit(event)
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