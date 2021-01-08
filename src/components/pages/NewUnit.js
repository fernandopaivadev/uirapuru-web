import React, { useState, useEffect } from 'react'

import NavBar from '../blocks/NavBar'

import api from '../../services/api'

import storage from '../../services/storage'

import {
    formatCEP,
    getOnlyNumbers,
    validateForm,
    setFormsValidation
} from '../../services/forms'

import styles from '../../styles/newunit'
import util from '../../styles/util'

const NewUnit = ({ history }) => {
    const user = storage.read('user')

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

    useEffect(() => {
        setFormsValidation()
    })

    const submit = async event => {
        event.preventDefault()

        const result = await api.updateUser(user)

        if (result === 'OK') {
            setSuccess(true)
            history.push('/profile')
        } else {
            setErrorMessage(result)
            setError(true)
        }

        setLoading(false)
    }

    return <>
        <NavBar />

        <styles.main>
            <styles.form
                id='consumerUnitForm'
                onSubmit={event=>{
                    event.preventDefault()
                }}>
                <styles.title>
                    Dados da nova unidade
                </styles.title>
                <label>Número</label>
                <input
                    id='number'
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
                    id='name'
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
                    id='address'
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
                    id='zip'
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
                    id='city'
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
                    id='state'
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
                    <styles.loading>
                        <util.circularProgress/>
                    </styles.loading>
                    :
                    <styles.buttons>
                        <util.classicButton
                            id='back'
                            onClick={event => {
                                event.preventDefault()
                                history.push('/profile')
                            }}
                        >
                            Voltar
                        </util.classicButton>

                        <util.classicButton
                            id='save'
                            onClick={event => {
                                event.preventDefault()
                                if (validateForm('consumerUnitForm')) {
                                    user.consumerUnits.push(consumerUnit)
                                    submit(event)
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
                        </util.classicButton>
                    </styles.buttons>
                }
                {success && !error?
                    <p className='success'>
                        Salvo com sucesso!
                    </p>
                    : null
                }

                {!success && error?
                    <p
                        id='errorMessage'
                        className='error'>
                        {errorMessage}
                    </p>
                    : null
                }
            </styles.form>
        </styles.main>
    </>
}

export default NewUnit
