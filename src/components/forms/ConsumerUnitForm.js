import React, { useState } from 'react'

import api from '../../services/api'

import Modal from '../blocks/Modal'

import { withRouter } from 'react-router-dom'

import {
    formatCEP,
    getOnlyNumbers,
    validateForm
} from '../../services/forms'

import styles from '../../styles/consumerunitform'
import util from '../../styles/util'

const ConsumerUnitForm = ({ history, user, consumerUnitIndex }) => {
    const [isAdmin] = useState(user.accessLevel === 'admin')
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [modal, setModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState('Ocorreu um erro')

    const submit = async () => {
        const result = await api.updateUser(user)

        if (result === 'OK') {
            setSuccess(true)
            setError(false)

            setTimeout(() => {
                setSuccess(false)
                window.location.reload()
            }, 2000)
        } else {
            setErrorMessage(result)
            setSuccess(false)
            setError(true)

            setTimeout(() => {
                setError(false)
            }, 2000)
        }
    }

    return user?.consumerUnits ?
        <styles.form id='consumerUnitForm'>
            {modal ?
                <Modal
                    message={'Você tem certeza?'}
                    taskOnYes={() => {
                        user?.consumerUnits.pop(consumerUnitIndex)
                        submit()
                        setModal(false)
                    }}
                    taskOnNo={() => {
                        setModal(false)
                    }}
                />
                : null
            }

            <styles.title>
            Dados da Unidade Consumidora
            </styles.title>

            <label>Número</label>
            <input
                id='number'
                name='number'
                minLength='6'
                maxLength='16'
                required
                defaultValue={user
                    ?.consumerUnits[consumerUnitIndex]
                    ?.number ?? ''}
                readOnly= {!user}
                onChange={event => {
                    user.consumerUnits[consumerUnitIndex]
                        .number = event.target.value
                }}
            />
            <p className='error-message'>
            Digite no mínimo 6 caracteres
            </p>

            <label>Nome da unidade consumidora</label>
            <input
                id='unitName'
                name='name'
                maxLength='64'
                minLength='8'
                required
                defaultValue={user
                    ?.consumerUnits[consumerUnitIndex]
                    ?.name ?? ''}
                readOnly= {!user}
                onChange={event => {
                    user.consumerUnits[consumerUnitIndex]
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
                defaultValue={user
                    ?.consumerUnits[consumerUnitIndex]
                    ?.address ?? ''}
                readOnly= {!user}
                onChange={event => {
                    user.consumerUnits[consumerUnitIndex]
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
                required
                pattern='\d{5}-\d{3}'
                defaultValue={formatCEP(user
                    ?.consumerUnits[consumerUnitIndex]?.zip) ?? ''}
                readOnly= {!user}
                onChange={event => {
                    user
                        .consumerUnits[consumerUnitIndex]
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
                id='city'
                name='city'
                maxLength='64'
                minLength='3'
                required
                defaultValue={user
                    ?.consumerUnits[consumerUnitIndex]
                    ?.city ?? ''}
                readOnly= {!user}
                onChange={event => {
                    user.consumerUnits[consumerUnitIndex]
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
                defaultValue={user
                    ?.consumerUnits[consumerUnitIndex]
                    ?.state ?? ''}
                readOnly= {!user}
                onChange={event => {
                    user.consumerUnits[consumerUnitIndex]
                        .state = event.target.value
                }}
            />
            <p className='error-message'>
            Digite no mínimo 3 caracteres
            </p>

            <styles.buttons>
                {isAdmin ?
                    <util.criticalButton
                        id='deleteUnit'
                        onClick={event => {
                            event.preventDefault()
                            setModal(true)
                        }}
                    >
                    Excluir Unidade
                    </util.criticalButton>
                    : null
                }
                {isAdmin ?
                    <util.classicButton
                        id='newUnit'
                        onClick = { () => {
                            history.push('/new-unit')
                        }}
                    >
                    Nova Unidade
                    </util.classicButton>
                    : null
                }
                {isAdmin ?
                    <util.classicButton
                        id='saveUnit'
                        onClick={event => {
                            event.preventDefault()
                            if (validateForm('consumerUnitForm')) {
                                submit()
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
                    : null
                }
            </styles.buttons>

            {success && !error?
                <p
                    id='successMessageUnit'
                    className='success'>
                Salvo com sucesso!
                </p>
                : null
            }
            {!success && error?
                <p
                    id='errorMessageUnit'
                    className='error'>
                    { errorMessage }
                </p>
                : null
            }
        </styles.form>
        : null
}

export default withRouter(ConsumerUnitForm)
