import React, { useState } from 'react'

import api from '../../../services/api'

import Modal from '../../blocks/Modal/Modal'

import { withRouter } from 'react-router-dom'

import {
    formatCEP,
    getOnlyNumbers,
    validateForm
} from '../../../services/forms'

import styles from './consumerunitform.style'
import util from '../../../util/util.style'

const ConsumerUnitForm = ({ history, user, isAdmin, consumerUnitIndex }) => {
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

            <styles.title
                data-testid='title'
            >
                Dados da Unidade Consumidora
            </styles.title>

            <label
                data-testid='numberLabel'
            >
                Número
            </label>
            <input
                id='number'
                data-testid='number'
                name='number'
                minLength='6'
                maxLength='16'
                required
                defaultValue={user
                    ?.consumerUnits[consumerUnitIndex]
                    ?.number ?? ''}
                readOnly={!isAdmin}
                onChange={event => {
                    user.consumerUnits[consumerUnitIndex]
                        .number = event.target.value
                }}
            />
            <p className='error-message'>
                Digite no mínimo 6 caracteres
            </p>

            <label
                data-testid='unitNameLabel'
            >
                Nome da unidade consumidora
            </label>
            <input
                id='unitName'
                data-testid='unitName'
                name='name'
                maxLength='64'
                minLength='8'
                required
                defaultValue={user
                    ?.consumerUnits[consumerUnitIndex]
                    ?.name ?? ''}
                readOnly={!isAdmin}
                onChange={event => {
                    user.consumerUnits[consumerUnitIndex]
                        .name = event.target.value
                }}
            />
            <p className='error-message'>
                Digite no mínimo 8 caracteres
            </p>

            <label
                data-testid='addressLabel'
            >
                Endereço
            </label>
            <input
                id='address'
                data-testid='address'
                name='address'
                maxLength='256'
                minLength='10'
                required
                defaultValue={user
                    ?.consumerUnits[consumerUnitIndex]
                    ?.address ?? ''}
                readOnly={!isAdmin}
                onChange={event => {
                    user.consumerUnits[consumerUnitIndex]
                        .address = event.target.value
                }}
            />
            <p className='error-message'>
                Digite no mínimo 10 caracteres
            </p>

            <label
                data-testid='zipLabel'
            >
                CEP
            </label>
            <input
                id='zip'
                data-testid='zip'
                name='zip'
                required
                pattern='\d{5}-\d{3}'
                defaultValue={formatCEP(user
                    ?.consumerUnits[consumerUnitIndex]?.zip) ?? ''}
                readOnly={!isAdmin}
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

            <label
                data-testid='cityLabel'
            >
                Cidade
            </label>
            <input
                id='city'
                data-testid='city'
                name='city'
                maxLength='64'
                minLength='3'
                required
                defaultValue={user
                    ?.consumerUnits[consumerUnitIndex]
                    ?.city ?? ''}
                readOnly={!isAdmin}
                onChange={event => {
                    user.consumerUnits[consumerUnitIndex]
                        .city = event.target.value
                }}
            />
            <p className='error-message'>
                Digite no mínimo 3 caracteres
            </p>

            <label
                data-testid='stateLabel'
            >
                Estado
            </label>
            <input
                id='state'
                data-testid='state'
                name='state'
                maxLength='64'
                minLength='3'
                required
                defaultValue={user
                    ?.consumerUnits[consumerUnitIndex]
                    ?.state ?? ''}
                readOnly={!isAdmin}
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
                        data-testid='deleteUnit'
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
                        data-testid='newUnit'
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
                        data-testid='saveUnit'
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
