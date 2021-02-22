import React, { useEffect, useState } from 'react'

import NavBar from '../../blocks/NavBar/NavBar'

import api from '../../../services/api'

import storage from '../../../services/storage'


import {
    convertDate,
    formatUsername,
    formatPhone,
    formatCPF,
    formatCNPJ,
    formatDate,
    getOnlyNumbers,
    validateForm,
    setFormsValidation
} from '../../../services/forms'

import styles from './newuser.style'
import util from '../../../util/util.style'
import { themes } from '../../../util/themes.style'

const NewUser = ({ history }) => {
    const [user, setUser] = useState()
    const [newUser, setNewUser] = useState()
    const [userType, setUserType] = useState()
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('Ocorreu um erro')
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState()
    const [isAdmin, setIsAdmin] = useState(false)
    const [theme, setTheme] = useState()
    const [isDarkMode, setIsDarkMode] = useState()

    useEffect(() => {
        (async () => {
            setUser(await storage.read('user'))
            setUsername(await storage.read('username'))
            setIsAdmin(await storage.read('access-level') === 'admin')
            setTheme(themes[await storage.read('theme') ?? 'default'])
            setIsDarkMode(await storage.read('theme') === 'dark')
        })()
    }, [])

    useEffect(() => {
        setFormsValidation()
    })

    useEffect(() => {
        if (userType === 'company') {
            const _newUser = {
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
            }

            setNewUser(_newUser)
        } else if (userType === 'person') {
            const _newUser = {
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
            }

            setNewUser(_newUser)
        }
    }, [userType])

    const submit = async () => {
        setLoading(true)

        const result = await api.createUser(newUser)

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

    return <>
        <NavBar
            user={user}
            username={username}
            isAdmin={isAdmin}
            theme={theme}
            isDarkMode={isDarkMode}
        />

        {userType ?
            null
            :
            <styles.dialog>
                <util.classicButton
                    id='registerPerson'
                    onClick={() => {
                        setUserType('person')
                    }}
                >
                    Cadastrar Pessoa Física
                </util.classicButton>

                <util.classicButton
                    id='registerCompany'
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
            </styles.dialog>
        }

        {userType === 'company' ?
            <styles.main>
                <styles.form id='companyUserForm'>
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
                            newUser.username = event.target.value
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
                        maxLength='32'
                        minLength='8'
                        required
                        onChange={event => {
                            newUser.password = event.target.value
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
                        onChange={event => {
                            newUser.email = event.target.value
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
                        onChange={event => {
                            newUser.phone = getOnlyNumbers(event.target.value)
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
                                newUser.accessLevel = 'admin'
                            } else if (value === 'Usuário') {
                                newUser.accessLevel = 'user'
                            }
                        }}
                    >
                        <option>Usuário</option>
                        <option>Administrador</option>
                    </select>

                    <label>CNPJ</label>
                    <input
                        id='cnpj'
                        name='cnpj'
                        required
                        pattern='\d{2}\.\d{3}\.\d{3}.\d{4}-\d{2}'
                        onChange={event => {
                            newUser.company.cnpj = getOnlyNumbers(event
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
                        id='name'
                        name='name'
                        maxLength='128'
                        minLength='6'
                        required
                        onChange={event => {
                            newUser.company.name = event
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
                        onChange={event => {
                            newUser.company.tradeName = event
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
                        onChange={event => {
                            newUser.company.description = event
                                .target
                                .value
                        }}
                    />
                    <p className='error-message'>
                        Digite no mínimo 50 caracteres
                    </p>

                    <styles.buttons>
                        <util.classicButton
                            id='back'
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

                                if (validateForm('companyUserForm')) {
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
            :
            null
        }

        {userType === 'person' ?
            <styles.main>
                <styles.form id='personUserForm'>
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
                            newUser.username = event.target.value
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
                        maxLength='32'
                        minLength='8'
                        required
                        onChange={event => {
                            newUser.password = event.target.value
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
                        onChange={event => {
                            newUser.email = event.target.value
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
                        onChange={event => {
                            newUser.phone = getOnlyNumbers(event.target.value)
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
                                newUser.accessLevel = 'admin'
                            } else if (value === 'Usuário') {
                                newUser.accessLevel = 'user'
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
                        onChange={event => {
                            newUser.person.name = event
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
                        onChange={event => {
                            newUser.person.cpf = getOnlyNumbers(event
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
                        onChange={event => {
                            event.target.value = formatDate(
                                event.target.value
                            )
                            newUser.person.birth = convertDate(event.target.value)
                        }}
                    />
                    <p className='error-message'>
                        Data inválida
                    </p>
                    <styles.buttons>
                        <util.classicButton
                            id='back'
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

                                if (validateForm('personUserForm')) {
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
            :
            null
        }
    </>
}

export default NewUser