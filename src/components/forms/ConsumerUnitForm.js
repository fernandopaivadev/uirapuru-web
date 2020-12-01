import React, { useState } from 'react'

import storage from '../../services/storage'

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

const ConsumerUnitForm = ({ consumerUnitIndex, history }) => {
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [modal, setModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState(
        'Ocorreu um erro'
    )

    const user = storage.read('user')
    const admin = storage.read('access-level') === 'admin'

    const submit = async () => {
        const result = await api.updateUser(user)

        if (result === 'OK') {
            setSuccess(true)
            setError(false)

            setTimeout(() => {
                setSuccess(false)
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

    return <styles.form>
        { modal ?
            <Modal
                message={'Você tem certeza?'}
                taskOnYes={() => {
                    user.consumerUnits.pop(consumerUnitIndex)
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
            name='number'
            minLength='6'
            maxLength='16'
            required
            defaultValue={user
                .consumerUnits[ consumerUnitIndex ]
                ?.number ?? ''}
            readOnly= {!user}
            onChange={ event => {
                user.consumerUnits[ consumerUnitIndex]
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
            defaultValue={user
                .consumerUnits[ consumerUnitIndex ]
                ?.name ?? ''}
            readOnly= {!user}
            onChange={ event => {
                user.consumerUnits[ consumerUnitIndex]
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
            defaultValue={user
                .consumerUnits[ consumerUnitIndex ]
                ?.address ?? ''}
            readOnly= {!user}
            onChange={ event => {
                user.consumerUnits[ consumerUnitIndex]
                    .address = event.target.value
            }}
        />
        <p className='error-message'>
            Digite no mínimo 10 caracteres
        </p>

        <label>CEP</label>
        <input
            name='zip'
            required
            pattern='\d{5}-\d{3}'
            defaultValue={formatCEP(user
                .consumerUnits[ consumerUnitIndex ]?.zip) ?? ''}
            readOnly= {!user}
            onChange={ event => {
                user
                    .consumerUnits[ consumerUnitIndex]
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
            name='city'
            maxLength='64'
            minLength='3'
            required
            defaultValue={user
                .consumerUnits[ consumerUnitIndex ]
                ?.city ?? ''}
            readOnly= {!user}
            onChange={ event => {
                user.consumerUnits[ consumerUnitIndex]
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
            defaultValue={user
                .consumerUnits[ consumerUnitIndex ]
                ?.state ?? ''}
            readOnly= {!user}
            onChange={ event => {
                user.consumerUnits[ consumerUnitIndex]
                    .state = event.target.value
            }}
        />
        <p className='error-message'>
            Digite no mínimo 3 caracteres
        </p>

        <styles.buttons>
            {admin ?
                <util.criticalButton
                    onClick={ event => {
                        event.preventDefault()
                        setModal(true)
                    }}
                >
                    Excluir Unidade
                </util.criticalButton>
                : null
            }
            {admin ?
                <util.classicButton
                    onClick = { () => {
                        history.push('/new-unit')
                    }}
                >
                    Nova Unidade
                </util.classicButton>
                : null
            }
            {admin ?
                <util.classicButton
                    onClick={ event => {
                        event.preventDefault()
                        if (validateForm(1)) {
                            submit(1)
                        } else {
                            setErrorMessage('Preencha todos os campos')
                            const _error = [...error]
                            _error[1] = true
                            setError(_error)

                            setTimeout(() => {
                                const _error = [...error]
                                _error[1] = false
                                setError(_error)
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
    </styles.form>
}

export default withRouter(ConsumerUnitForm)
