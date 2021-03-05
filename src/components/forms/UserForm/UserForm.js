import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'

import { setFormsValidation ,
    formatUsername,
    formatPhone,
    formatCPF,
    formatCNPJ,
    formatTimeStamp,
    formatDate,
    getOnlyNumbers,
    validateForm,
} from '../../../services/forms'

import api from '../../../services/api'

import styles from './UserForm.style'
import util from '../../../util/util.style'

const UserForm = ({ history, user, isAdmin, userType, exit }) => {
    const [userData, setUserData] = useState(user)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('Ocorreu um erro')

    useEffect(() => {
        setFormsValidation()
    })

    useEffect(() => {
        if(!userData && userType && isAdmin) {
            if (userType === 'company') {
                setUserData({
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
                setUserData({
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
                const result = await api.createUser(userData)

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
                const result = await api.updateUser(userData)

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
            data-testid='testUsername'
            name='username'
            maxLength='20'
            minLength='6'
            required
            defaultValue={userData?.username ?? ''}
            readOnly={!isAdmin}
            onChange={event => {
                userData.username = event.target.value
                event.target.value = formatUsername(
                    event.target.value
                )
            }}
        />
        <p className='error-message'>
            Digite no mínimo 6 caracteres
        </p>

        {isAdmin && typeof userData?.password === 'string' ?
            <>
                <label
                    data-testid='passwordLabel'
                >
                    Senha
                </label>
                <input
                    data-testid='password'
                    type='password'
                    name='password'
                    maxLength='32'
                    minLength='8'
                    required
                    onChange={event => {
                        userData.password = event.target.value
                    }}
                />
                <p className='error-message'>
                        Digite no mínimo 8 caracteres
                </p>
            </>
            : null
        }

        {isAdmin ?
            <>
                <label
                    data-testid='accessLevelLabel'
                >
                    Nível de Acesso
                </label>
                <select
                    data-testid='accessLevel'
                    name='accessLevel'
                    required
                    onChange={event => {
                        const { value } = event.target

                        if (value === 'Administrador') {
                            userData.accessLevel = 'admin'
                        } else if (value === 'Usuário') {
                            userData.accessLevel = 'user'
                        }
                    }}
                >
                    <option>Usuário</option>
                    <option>Administrador</option>
                </select>
            </>
            : null
        }

        <label
            data-testid='emailLabel'
        >
            Email
        </label>
        <input
            data-testid='email'
            name='email'
            maxLength='40'
            minLength='10'
            required
            defaultValue={userData?.email ?? ''}
            readOnly={!isAdmin}
            onChange={event => {
                userData.email = event.target.value
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
            data-testid='phone'
            name='phone'
            required
            pattern='\(\d{2}\) \d{5}-\d{4}$'
            defaultValue={formatPhone(userData?.phone) ?? ''}
            readOnly={!isAdmin}
            onChange={event => {
                userData.phone = getOnlyNumbers(event.target.value)
                event.target.value =  formatPhone(
                    event.target.value
                )
            }}
        />
        <p className='error-message'>
            Número de telefone inválido
        </p>

        {userData?.person ?
            <>
                <label
                    data-testid='nameLabel'
                >
                    Nome completo
                </label>
                <input
                    data-testid='name'
                    name='name'
                    maxLength='128'
                    minLength='10'
                    required
                    defaultValue={userData?.person?.name ?? ''}
                    readOnly= {!isAdmin}
                    onChange={event => {
                        userData.person.name = event.target.value
                    }}
                />
                <p className='error-message'>
                    Digite no mínimo 10 caracteres
                </p>

                <label
                    data-testid='cpfLabel'
                >
                    CPF
                </label>
                <input
                    data-testid='cpf'
                    name='cpf'
                    required
                    pattern='\d{3}\.\d{3}\.\d{3}-\d{2}'
                    defaultValue={formatCPF(userData?.person?.cpf) ?? ''}
                    readOnly={!isAdmin}
                    onChange={event => {
                        userData.person.cpf = getOnlyNumbers(
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
                >
                    Data de nascimento
                </label>
                <input
                    data-testid='birth'
                    name='birth'
                    required
                    pattern='\d{2}\/\d{2}\/\d{4}'
                    defaultValue={formatTimeStamp(userData?.person?.birth)}
                    readOnly={!isAdmin}
                    onChange={event => {
                        userData.person.birth = event.target.value
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
        {userData?.company ?
            <>
                <label
                    data-testid='cnpjLabel'
                >
                    CNPJ
                </label>
                <input
                    data-testid='cnpj'
                    name='cnpj'
                    required
                    pattern='\d{2}\.\d{3}\.\d{3}.\d{4}-\d{2}'
                    defaultValue={formatCNPJ(userData?.company?.cnpj)}
                    readOnly={!isAdmin}
                    onChange={event => {
                        userData.company.cnpj = getOnlyNumbers(
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
                    data-testid='name'
                    name='name'
                    maxLength='128'
                    minLength='6'
                    required
                    defaultValue={userData?.company
                        ?.name ?? ''}
                    readOnly={!isAdmin}
                    onChange={event => {
                        userData.company.name = event
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
                    data-testid='tradeName'
                    name='tradeName'
                    maxLength='128'
                    minLength='6'
                    required
                    defaultValue={userData?.company
                        ?.tradeName ?? ''}
                    readOnly={!isAdmin}
                    onChange={event => {
                        userData.company.tradeName = event
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
                    data-testid='description'
                    name='description'
                    maxLength='512'
                    minLength='50'
                    required
                    defaultValue={userData?.company?.description ?? ''}
                    readOnly={!isAdmin}
                    onChange={event => {
                        userData.company.description = event.target.value
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
                data-testid='successMessage'
                className='success'>
                Salvo com sucesso!
            </p>
            : null
        }
        {!success && error?
            <p
                data-testid='errorMessage'
                className='error'>
                { errorMessage }
            </p>
            : null
        }
    </styles.form>
}

export default withRouter(UserForm)
