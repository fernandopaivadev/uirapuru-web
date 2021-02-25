import React, { useState } from 'react'

import api from '../../../services/api'

import {
    FaEye as ShowPasswordIcon,
    FaEyeSlash as HidePasswordIcon
} from 'react-icons/fa'

import logo from '../../../assets/logo.svg'

import styles from './Login.style'
import util from '../../../util/util.style'

const Login = ({ history }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
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

        if (passwordInput.type === 'password') {
            passwordInput.type = 'text'
            setShowPassword(true)
        } else {
            passwordInput.type = 'password'
            setShowPassword(false)
        }
    }

    return <styles.main>
        <styles.form onSubmit={submit}>
            <styles.logo
                e2eTestId='logo'
            >
                <img
                    id='img'
                    src={logo}
                    alt='Tech Amazon Logo'
                />
                <p>Uirapuru</p>
            </styles.logo>

            <styles.label
                testid='emailLabel'
                htmlFor='email'
            >
                E-mail ou nome de usuário
            </styles.label>
            <styles.input
                autoFocus
                data-testid='email'
                required
                onChange={event => {
                    setUsername(event.target.value)
                }}
            />

            <styles.label
                id='passwordLabel'
                htmlFor='password'>
                Senha
            </styles.label>
            <styles.password>
                {showPassword ?
                    <HidePasswordIcon
                        id='hidePasswordIcon'
                        className='showPasswordIcon'
                        onClick={event => {
                            togglePassword(event)
                        }}
                    />
                    :
                    <ShowPasswordIcon
                        id='ShowPasswordIcon'
                        className='showPasswordIcon'
                        onClick={event => {
                            togglePassword(event)
                        }}
                    />
                }
                <styles.input
                    data-testid='password'
                    type='password'
                    required
                    onChange={event => {
                        setPassword(event.target.value)
                    }}
                />
            </styles.password>

            {loading ?
                <styles.loading
                    data-testid='loading'
                >
                    <util.circularProgress/>
                </styles.loading>
                :
                <util.classicButton
                    data-testid='button'
                    type='submit'
                >
                    ENTRAR
                </util.classicButton>
            }

            {loading ? null :
                <styles.link
                    id='link'
                    onClick={() => {
                        history.push('/forgot-password')
                    }}
                >
                    Esqueci minha senha
                </styles.link>
            }

            {error ?
                <styles.error
                    id='error'
                    data-testid='error'
                >
                    <label>{errorMessage}</label>
                </styles.error>
                :null
            }
        </styles.form>
    </styles.main>
}

export default Login