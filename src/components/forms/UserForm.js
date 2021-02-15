import React, { useState } from 'react'

import api from '../../services/api'

import {
    formatUsername,
    formatPhone,
    formatCPF,
    formatCNPJ,
    formatTimeStamp,
    formatDate,
    getOnlyNumbers,
    validateForm,
} from '../../services/forms'

import styles from '../../styles/userform'
import util from '../../styles/util'

const UserForm = ({ user }) => {
    const [isAdmin] = useState(user.accessLevel === 'admin')
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState(
        'Ocorreu um erro'
    )

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

    return <styles.form id='userForm'>
        <styles.title>
            Dados do Usuário
        </styles.title>

        <label>Nome de usuário</label>
        <input
            id='username'
            name='username'
            maxLength='20'
            minLength='6'
            required
            defaultValue={user.username ?? ''}
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

        <label>Email</label>
        <input
            id='email'
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

        <label>Telefone</label>
        <input
            id='phone'
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
                <label>Nome completo</label>
                <input
                    id='name'
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

                <label>CPF</label>
                <input
                    id='cpf'
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

                <label>Data de nascimento</label>
                <input
                    id='birth'
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
            :
            <>
                <label>CNPJ</label>
                <input
                    id='cnpj'
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

                <label>Nome Fantasia</label>
                <input
                    id='name'
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

                <label>Razão social</label>
                <input
                    id='tradeName'
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

                <label>Descrição</label>
                <textarea
                    id='description'
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
        }
        {isAdmin ?
            <util.classicButton
                id='save'
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

export default UserForm
