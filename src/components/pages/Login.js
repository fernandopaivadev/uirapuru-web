import React, { useState } from 'react'

import api from '../../services/api'

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

    const submit = async event => {
        event.preventDefault()

        setLoading(true)

        const result = await api.login(username, password, adminMode)

        if (result === 'OK') {
            if (adminMode) {
                history.push('/users-list')
            } else {
                history.push('/dashboard')
            }
        } else if (result === 'NOT AUTHORIZED') {
            setLoading(false)
            setErrorMessage('Senha incorreta')
            setError(true)
        } else if (result === 'NOT FOUND') {
            setLoading(false)
            setErrorMessage('Usuário não encontrado')
            setError(true)
        } else if (result === 'ERROR') {
            setLoading(false)
            setErrorMessage('Ocorreu um erro')
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
        <form onSubmit={submit}>
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

export default Login
