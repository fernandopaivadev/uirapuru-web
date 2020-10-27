import React, { useState, useEffect, memo } from 'react'

import { adminLogin, login, isAuthenticated, isAdmin } from '../../services/auth'

import { api } from '../../services/api'

import fetch from '../../services/fetch'

import logo from '../../assets/logo.svg'

import '../../styles/login.css'

import '../../styles/util.css'

const Login = ({ history }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [adminMode, setAdminMode] = useState(false)

    useEffect(() => {
        if (isAuthenticated()) {
            if (isAdmin()) {
                history.push('/users-list')
            } else {
                history.push('/dashboard')
            }
        }
    }, [history])

    const handleSubmit = async event => {
        try {
            event.preventDefault()
            setLoading(true)
            setError(false)

            const response = await api.get(
                adminMode ?
                    `/admin/auth?level=${username}&password=${password}`
                    :
                    `/user/auth?username=${username}&password=${password}`
            )

            const status = response?.status

            if (status === 200) {
                setLoading(false)

                if (adminMode) {
                    adminLogin(response.data.token)

                    if(await fetch()) {
                        history.push('/users-list')
                    }
                } else {
                    login(response.data.token)

                    if(await fetch()) {
                        history.push('/dashboard')
                    }
                }
            }
        } catch (err) {
            console.log(err?.message ?? err?.response?.data?.message)

            const status = err?.response?.status

            if (status === 404) {
                setErrorMessage('Usuário não encontrado')
            } else if (status === 401) {
                setErrorMessage('Senha incorreta')
            } else {
                setErrorMessage('Ocorreu um erro')
            }

            setLoading(false)
            setError(true)
        }
    }

    const togglePassword = event => {
        event.preventDefault()
        const passwordInput = document.querySelector('#password')
        const togglePasswordButton = document.querySelector('#toggle-password')

        if (passwordInput.type === 'password') {
            passwordInput.type = 'text'
            togglePasswordButton.innerHTML='Ocultar'
        } else {
            passwordInput.type = 'password'
            togglePasswordButton.innerHTML='Exibir'
        }
    }

    return <div className='login'>
        <form onSubmit={handleSubmit}>
            <div className='logo'>
                <img
                    src={logo}
                    alt='Tech Amazon Logo'
                />
                <h1>Uirapuru</h1>
            </div>

            {adminMode ?
                <label htmlFor='email'>
                    Nível de acesso
                </label>
                :
                <label htmlFor='email'>
                    E-mail ou nome de usuário
                </label>
            }
            <input
                autoFocus
                id='email'
                required
                onChange={event => {
                    setUsername(event.target.value)
                }}
            />

            <div className='container'>
                <label htmlFor='password'>
                    Senha
                </label>
                <p
                    id='toggle-password'
                    onClick={event => {
                        togglePassword(event)
                    }}
                >
                    Exibir
                </p>
            </div>

            <input
                id='password'
                type='password'
                required
                onChange={event => {
                    setPassword(event.target.value)
                }}
            />

            {loading ?
                <div className='loading-container'>
                    <progress className='circular-progress'/>
                </div>
                :
                <button
                    type='submit'
                    className='classic-button'
                >
                    ENTRAR
                </button>
            }

            {loading ? null :
                !adminMode ?
                    <>
                        <p
                            className='link'
                            onClick={() => {
                                history.push('/forgot-password')
                            }}>
                                Esqueci minha senha
                        </p>
                        <p
                            className='link'
                            onClick={() => {
                                setAdminMode(true)
                            }}>
                                Sou administrador
                        </p>
                    </>
                    :
                    <p
                        className='link'
                        onClick={() => {
                            setAdminMode(false)
                        }}
                    >
                        Voltar
                    </p>
            }

            {error ?
                <h1 className='message'>
                    {errorMessage}
                </h1>
                :null
            }
        </form>
    </div>
}

export default memo(Login)
