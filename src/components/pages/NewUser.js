import React, { useEffect, useState, useCallback } from 'react'

import NavBar from '../blocks/NavBar'

import api from '../../services/api'

import {
    formatUsername,
    formatPhone,
    formatCPF,
    formatCNPJ,
    formatDate,
    getOnlyNumbers,
    validateForm,
    setFormsValidation
} from '../../services/forms'

import styles from '../../styles/newuser'
import util from '../../styles/util'

const NewUser = ({ history }) => {
    const [user, setUser] = useState({
        username: '',
        password: '',
        email: '',
        phone: '',
        company: {},
        consumerUnits: []
    })

    const [userType, setUserType] = useState()
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('Ocorreu um erro')
    const [loading, setLoading] = useState(false)

    useEffect(useCallback(() => {
        const _user = user

        if (userType === 'person') {
            delete _user.company
            _user.person = {}
        } else if (userType === 'company') {
            delete _user.person
            _user.company = {}
        }

        setUser(_user)

        const form = document.querySelector('form')
        const formChildren = [...form.children]

        formChildren.forEach((field, index) => {
            if (index > 11 && field.tagName === 'INPUT') {
                field.value = ''
            }
        })
    }, [userType, user]
    ))

    useEffect(() => {
        setFormsValidation()
    })

    const submit = async () => {
        setLoading(true)

        const result = await api.createUser(user)

        if (result === 'OK') {
            setSuccess(true)
            history.push('/users-list')
        } else {
            setErrorMessage(result)
            setError(true)

            setTimeout(() => {
                setError(false)
            }, 2000)
        }

        setLoading(false)
    }

    const buttonPress = (task, id) => {
        if (validateForm(id)) {
            task()
        } else {
            setErrorMessage('Preencha todos os campos')
            setError(true)

            setTimeout(() => {
                setError(false)
            }, 3000)
        }
    }

    return <>
        <NavBar />

        {userType ?
            null
            :
            <styles.dialog>
                <div className='window'>
                    <util.classicButton
                        id='registerPerson'
                        onClick={() => {
                            setUserType('person')
                        }}
                    >
                        Cadastrar Pessoa Física
                    </util.classicButton>

                    <util.classicButton
                        onClick={() => {
                            setUserType('company')
                        }}
                    >
                        Cadastrar Pessoa Jurídica
                    </util.classicButton>

                    <util.classicButton
                        id='backToUsersList'
                        onClick={event => {
                            event.preventDefault()
                            history.push('/users-list')
                        }}
                    >
                        Voltar
                    </util.classicButton>
                </div>
            </styles.dialog>
        }

        {userType === 'company' ?
            <styles.main>
                <styles.form id='userForm'>
                    <styles.title>
                    Dados do novo usuário
                    </styles.title>

                    <label>Nome de usuário</label>
                    <input
                        id='username'
                        name='username'
                        maxLength='20'
                        minLength='6'
                        required
                        pattern='[a-zA-Z0-9]{6,20}'
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

                    <label>Senha</label>
                    <input
                        type='password'
                        name='password'
                        maxLength='128'
                        minLength='8'
                        required
                        onChange={ event => {
                            user.password = event.target.value
                        }}
                    />
                    <p className='error-message'>
                        Digite no mínimo 8 caracteres
                    </p>

                    <label>Email</label>
                    <input
                        name='email'
                        maxLength='40'
                        minLength='10'
                        required
                        onChange={ event => {
                            user.email = event.target.value
                        }}
                    />
                    <p className='error-message'>
                        Digite no mínimo 10 caracteres
                    </p>

                    <label>Telefone</label>
                    <input
                        name='phone'
                        required
                        pattern='\(\d{2}\) \d{5}-\d{4}$'
                        onChange={ event => {
                            user.phone = getOnlyNumbers(event.target.value)
                            event.target.value = formatPhone(
                                event.target.value
                            )
                        }}
                    />
                    <p className='error-message'>
                    Número de telefone inválido
                    </p>

                    <label>Nível de Acesso</label>
                    <select
                        name='phone'
                        required
                        onChange={event => {
                            const { value } = event.target

                            if (value === 'Administrador') {
                                user.accessLevel = 'admin'
                            } else if (value === 'Usuário') {
                                user.accessLevel = 'user'
                            }
                        }}
                    >
                        <option>Usuário</option>
                        <option>Administrador</option>
                    </select>

                    <label>CNPJ</label>
                    <input
                        name='cnpj'
                        required
                        pattern='\d{2}\.\d{3}\.\d{3}.\d{4}-\d{2}'
                        onChange={ event => {
                            user.company.cnpj = getOnlyNumbers(event
                                .target.value)
                            event.target.value = formatCNPJ(
                                event.target.value
                            )
                        }}
                    />
                    <p className='error-message'>
                            CNPJ inválido
                    </p>

                    <label>Nome fantasia</label>
                    <input
                        name='name'
                        maxLength='128'
                        minLength='6'
                        required
                        onChange={ event => {
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
                        name='tradeName'
                        maxLength='128'
                        minLength='6'
                        required
                        onChange={ event => {
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
                        name='description'
                        maxLength='512'
                        minLength='50'
                        required
                        onChange={ event => {
                            user.company.description = event
                                .target
                                .value
                        }}
                    />
                    <p className='error-message'>
                            Digite no mínimo 50 caracteres
                    </p>

                    <styles.buttons>
                        <util.classicButton
                            onClick={() => {
                                setUserType(undefined)
                            }}
                        >
                            Voltar
                        </util.classicButton>
                        <util.classicButton
                            id='save'
                            onClick={event => {
                                event.preventDefault()
                                buttonPress(() => {
                                    submit()
                                }, 'userForm')
                            }}
                        >
                            Salvar
                        </util.classicButton>
                    </styles.buttons>

                    {loading ?
                        <styles.loading>
                            <util.circularProgress/>
                        </styles.loading>
                        :
                        !success && error?
                            <p
                                id='errorMessage'
                                className='error'>
                                { errorMessage }
                            </p>
                            : null
                    }
                </styles.form>
            </styles.main>

            :

            <styles.main>
                <styles.form id='userForm'>
                    <styles.title>
                    Dados do novo usuário
                    </styles.title>

                    <label>Nome de usuário</label>
                    <input
                        id='username'
                        name='username'
                        maxLength='20'
                        minLength='6'
                        required
                        pattern='[a-zA-Z0-9]{6,20}'
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

                    <label>Senha</label>
                    <input
                        id='password'
                        type='password'
                        name='password'
                        maxLength='128'
                        minLength='8'
                        required
                        onChange={ event => {
                            user.password = event.target.value
                        }}
                    />
                    <p className='error-message'>
                        Digite no mínimo 8 caracteres
                    </p>

                    <label>Email</label>
                    <input
                        id='email'
                        name='email'
                        maxLength='40'
                        minLength='10'
                        required
                        onChange={ event => {
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
                        onChange={ event => {
                            user.phone = getOnlyNumbers(event.target.value)
                            event.target.value = formatPhone(
                                event.target.value
                            )
                        }}
                    />
                    <p className='error-message'>
                    Número de telefone inválido
                    </p>

                    <label>Nível de Acesso</label>
                    <select
                        id='accessLevel'
                        name='accessLevel'
                        required
                        onChange={event => {
                            const { value } = event.target

                            if (value === 'Administrador') {
                                user.accessLevel = 'admin'
                            } else if (value === 'Usuário') {
                                user.accessLevel = 'user'
                            }
                        }}
                    >
                        <option>Usuário</option>
                        <option>Administrador</option>
                    </select>

                    <label>Nome completo</label>
                    <input
                        id='name'
                        name='name'
                        maxLength='128'
                        minLength='10'
                        required
                        onChange={ event => {
                            user.person.name = event
                                .target.value
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
                        onChange={ event => {
                            user.person.cpf = getOnlyNumbers(event
                                .target.value)
                            event.target.value = formatCPF(
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
                        onChange={ event => {
                            user.person.birth = () =>
                                event.target.value.replace('/', '-')
                            event.target.value = formatDate(
                                event.target.value
                            )
                        }}
                    />
                    <p className='error-message'>
                            Data inválida
                    </p>
                    <styles.buttons>
                        <util.classicButton
                            onClick={() => {
                                setUserType(undefined)
                            }}
                        >
                            Voltar
                        </util.classicButton>
                        <util.classicButton
                            id='save'
                            onClick={event => {
                                event.preventDefault()
                                buttonPress(() => {
                                    submit()
                                }, 'userForm')
                            }}
                        >
                            Salvar
                        </util.classicButton>
                    </styles.buttons>

                    {loading ?
                        <styles.loading
                            id='loading'
                        >
                            <util.circularProgress/>
                        </styles.loading>
                        :
                        !success && error?
                            <p
                                id='errorMessage'
                                className='error'>
                                { errorMessage }
                            </p>
                            : null
                    }
                </styles.form>
            </styles.main>
        }
    </>
}

export default NewUser