import React, { useState, useEffect } from 'react'

import storage from '../../services/storage'

import api from '../../services/api'

import logo from '../../assets/logo.svg'

import styles from '../../styles/login'
import util from '../../styles/util'

const Login = ({ history }) => {
    useEffect(() => {
        if (storage.read('JWT')) {
            history.push('/dashboard')
        }
    })

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const submit = async event => {
        event.preventDefault()

        setLoading(true)

        const result = await api.login(username, password)

        if (result === 'OK') {
            history.push('/dashboard')
        } else  {
            setLoading(false)
            setErrorMessage(result)
            setError(true)

            setTimeout(() => {
                setError(false)
            }, 3000)
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

    return <styles.main>
        <styles.form onSubmit={submit}>
            <styles.logo>
                <img
                    src={logo}
                    alt='Tech Amazon Logo'
                />
                <p>Uirapuru</p>
            </styles.logo>

            <styles.label htmlFor='email'>
                E-mail ou nome de usuário
            </styles.label>
            <styles.input
                autoFocus
                id='email'
                required
                onChange={event => {
                    setUsername(event.target.value)
                }}
            />

            <styles.container>
                <styles.label htmlFor='password'>
                    Senha
                </styles.label>
                <p
                    id='toggle-password'
                    onClick={event => {
                        togglePassword(event)
                    }}
                >
                    Mostrar
                </p>
            </styles.container>

            <styles.input
                id='password'
                type='password'
                required
                onChange={event => {
                    setPassword(event.target.value)
                }}
            />

            {loading ?
                <styles.loading>
                    <util.circularProgress/>
                </styles.loading>
                :
                <util.classicButton
                    type='submit'
                >
                    ENTRAR
                </util.classicButton>
            }

            {loading ? null :
                <styles.link
                    onClick={() => {
                        history.push('/forgot-password')
                    }}>
                    Esqueci minha senha
                </styles.link>
            }

            {error ?
                <styles.error>
                    {errorMessage}
                </styles.error>
                :null
            }
        </styles.form>
    </styles.main>
}

export default Login
