import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'

import api from '../../../services/api'

import {
    formatUsername,
    formatPhone,
    formatCPF,
    formatCNPJ,
    formatTimeStamp,
    formatDate,
    getOnlyNumbers,
    validateForm,
} from '../../../services/forms'

import styles from './UserForm.style'
import util from '../../../util/util.style'

const UserForm = ({ history, user: _user, isAdmin, userType, exit }) => {
    const [user, setUser] = useState(_user)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('Ocorreu um erro')

    useEffect(() => {
        if(!user && userType && isAdmin) {
            if (userType === 'company') {
                setUser({
                    username: '',
                    password: '',
                    email: '',
                    phone: '',
                    company: {
                        name: '',
                        tradeName: '',
                        description: ''
                    },
                    consumerUnits: []
                })
            } else if (userType === 'person') {
                setUser({
                    username: '',
                    password: '',
                    email: '',
                    phone: '',
                    person: {
                        name: '',
                        cpf: '',
                        birth: ''
                    },
                    consumerUnits: []
                })
            }
        }
    })

    const submit = async () => {
        if (isAdmin) {
            setLoading(true)

            if (userType) {
                const result = await api.createUser(user)

                if (result === 'OK') {
                    setSuccess(true)
                    history.push('/users-list')
                } else {
                    setLoading(false)
                    setErrorMessage(result)
                    setSuccess(false)
                    setError(true)

                    setTimeout(() => {
                        setError(false)
                    }, 2000)
                }

            } else {
                const result = await api.updateUser(user)

                if (result === 'OK') {
                    setLoading(false)
                    setSuccess(true)
                    setError(false)

                    setTimeout(() => {
                        setSuccess(false)
                    }, 2000)
                } else {
                    setLoading(false)
                    setErrorMessage(result)
                    setSuccess(false)
                    setError(true)

                    setTimeout(() => {
                        setError(false)
                    }, 2000)
                }
            }
        }
    }

    return <styles.form id='userForm'>
        <styles.title
            data-testid='title'
        >
            Dados do Usuário
        </styles.title>

        <label
            data-testid='usernameLabel'
        >
            Nome de usuário
        </label>
        <input
            id='username'
            data-testid='username'
            name='username'
            maxLength='20'
            minLength='6'
            required
            defaultValue={user?.username ?? ''}
            readOnly={!isAdmin}
            onChange={event => {
                user.username = event.target.value
                event.target.value = formatUsername(
                    event.target.value
                )
            }}
        />
        <p className='error-message'>
            Digite no mínimo 6 caracteres
        </p>

        <label
            data-testid='emailLabel'
        >
            Email
        </label>
        <input
            id='email'
            data-testid='email'
            name='email'
            maxLength='40'
            minLength='10'
            required
            defaultValue={user?.email ?? ''}
            readOnly={!isAdmin}
            onChange={event => {
                user.email = event.target.value
            }}
        />
        <p className='error-message'>
            Digite no mínimo 10 caracteres
        </p>

        <label
            data-testid='phoneLabel'
        >
            Telefone
        </label>
        <input
            id='phone'
            data-testid='phone'
            name='phone'
            required
            pattern='\(\d{2}\) \d{5}-\d{4}$'
            defaultValue={formatPhone(user?.phone) ?? ''}
            readOnly={!isAdmin}
            onChange={event => {
                user.phone = getOnlyNumbers(event.target.value)
                event.target.value =  formatPhone(
                    event.target.value
                )
            }}
        />
        <p className='error-message'>
            Número de telefone inválido
        </p>

        {user?.person ?
            <>
                <label
                    data-testid='nameLabel'
                >
                    Nome completo
                </label>
                <input
                    id='name'
                    data-testid='name'
                    name='name'
                    maxLength='128'
                    minLength='10'
                    required
                    defaultValue={user?.person?.name ?? ''}
                    readOnly= {!isAdmin}
                    onChange={event => {
                        user.person.name = event.target.value
                    }}
                />
                <p className='error-message'>
                    Digite no mínimo 10 caracteres
                </p>

                <label
                    data-testid='cpfLabel'
                >CPF</label>
                <input
                    id='cpf'
                    data-testid='cpf'
                    name='cpf'
                    required
                    pattern='\d{3}\.\d{3}\.\d{3}-\d{2}'
                    defaultValue={formatCPF(user?.person?.cpf) ?? ''}
                    readOnly={!isAdmin}
                    onChange={event => {
                        user.person.cpf = getOnlyNumbers(
                            event.target.value
                        )
                        event.target.value =  formatCPF(
                            event.target.value
                        )
                    }}
                />
                <p className='error-message'>
                    CPF inválido
                </p>

                <label
                    data-testid='birthLabel'
                >Data de nascimento</label>
                <input
                    id='birth'
                    data-testid='birth'
                    name='birth'
                    required
                    pattern='\d{2}\/\d{2}\/\d{4}'
                    defaultValue={formatTimeStamp(user?.person?.birth) ?? ''}
                    readOnly={!isAdmin}
                    onChange={event => {
                        user.person.birth = event.target.value
                        event.target.value = formatDate(
                            event.target.value
                        )
                    }}
                />
                <p className='error-message'>
                    Data inválida
                </p>
            </>
            : null
        }
        {user?.company ?
            <>
                <label
                    data-testid='cnpjLabel'
                >
                    CNPJ
                </label>
                <input
                    id='cnpj'
                    data-testid='cnpj'
                    name='cnpj'
                    required
                    pattern='\d{2}\.\d{3}\.\d{3}.\d{4}-\d{2}'
                    defaultValue={formatCNPJ(user?.company?.cnpj)}
                    readOnly={!isAdmin}
                    onChange={event => {
                        user.company.cnpj = getOnlyNumbers(
                            event.target.value
                        )
                        event.target.value =  formatCNPJ(
                            event.target.value
                        )
                    }}
                />
                <p className='error-message'>
                    CNPJ inválido
                </p>

                <label
                    data-testid='nameLabel'
                >
                    Nome Fantasia
                </label>
                <input
                    id='name'
                    data-testid='name'
                    name='name'
                    maxLength='128'
                    minLength='6'
                    required
                    defaultValue={user?.company
                        ?.name ?? ''}
                    readOnly={!isAdmin}
                    onChange={event => {
                        user.company.name = event
                            .target
                            .value
                    }}
                />
                <p className='error-message'>
                    Digite no mínimo 6 caracteres
                </p>

                <label
                    data-testid='tradeNameLabel'
                >
                    Razão social
                </label>
                <input
                    id='tradeName'
                    data-testid='tradeName'
                    name='tradeName'
                    maxLength='128'
                    minLength='6'
                    required
                    defaultValue={user?.company
                        ?.tradeName ?? ''}
                    readOnly={!isAdmin}
                    onChange={event => {
                        user.company.tradeName = event
                            .target
                            .value
                    }}
                />
                <p className='error-message'>
                    Digite no mínimo 6 caracteres
                </p>

                <label
                    data-testid='descriptionLabel'
                >
                    Descrição
                </label>
                <textarea
                    id='description'
                    data-testid='description'
                    name='description'
                    maxLength='512'
                    minLength='50'
                    required
                    defaultValue={user?.company?.description ?? ''}
                    readOnly={!isAdmin}
                    onChange={event => {
                        user.company.description = event.target.value
                    }}
                />
                <p className='error-message'>
                    Digite no mínimo 50 caracteres
                </p>
            </>
            : null
        }

        {isAdmin ?
            !loading ?
                <styles.buttons>
                    <util.classicButton
                        id='save'
                        data-testid='save'
                        onClick={event => {
                            event.preventDefault()
                            if (validateForm('userForm')) {
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
                    <util.classicButton
                        id='backToUsersList'
                        onClick={event => {
                            event.preventDefault()
                            exit()
                        }}
                    >
                        Voltar
                    </util.classicButton>
                </styles.buttons>
                :
                <util.circularProgress/>
            : null
        }
        {success && !error?
            <p
                id='successMessage'
                className='success'>
                Salvo com sucesso!
            </p>
            : null
        }
        {!success && error?
            <p
                id='errorMessage'
                className='error'>
                { errorMessage }
            </p>
            : null
        }
    </styles.form>
}

export default withRouter(UserForm)
