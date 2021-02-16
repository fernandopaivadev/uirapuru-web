import React, { useState } from 'react'

import api from '../../../services/api'

import {
    FaEye as ShowPasswordIcon,
    FaEyeSlash as HidePasswordIcon
} from 'react-icons/fa'

import logo from '../../../assets/logo.svg'

import styles from './login.style'
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

            <styles.password>
                {showPassword ?
                    <HidePasswordIcon
                        className='showPasswordIcon'
                        onClick={event => {
                            togglePassword(event)
                        }}
                    />
                    :
                    <ShowPasswordIcon
                        className='showPasswordIcon'
                        onClick={event => {
                            togglePassword(event)
                        }}
                    />
                }
                <styles.input
                    id='password'
                    type='password'
                    required
                    onChange={event => {
                        setPassword(event.target.value)
                    }}
                />
            </styles.password>

            {loading ?
                <styles.loading>
                    <util.circularProgress/>
                </styles.loading>
                :
                <util.classicButton
                    id='button'
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
                <styles.error
                    id='error'
                >
                    <label>{errorMessage}</label>
                </styles.error>
                :null
            }
        </styles.form>
    </styles.main>
}

export default Login